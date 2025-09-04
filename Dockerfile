# ---------- Builder ----------
FROM node:20-alpine AS builder

# Dependencias mínimas del sistema
RUN apk add --no-cache git

# Habilitar pnpm vía Corepack (sin scripts externos)
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Instalar dependencias con cache óptimo
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar código y construir
COPY . .
RUN pnpm run typecheck && pnpm run build


# ---------- Producción ----------
FROM node:20-alpine AS production

# Utilidades para healthcheck
RUN apk add --no-cache curl

# Entorno
ENV NODE_ENV=production
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Fija un puerto por defecto; Railway exporta PORT en runtime
ENV PORT=8080

# Habilitar pnpm en esta etapa
RUN corepack enable && corepack prepare pnpm@latest --activate

# Crear y usar usuario sin privilegios
RUN adduser -D -u 10001 nodeuser
USER 10001

WORKDIR /app

# Para usar "vite preview" en runtime, necesitamos devDependencies (vite)
# Por eso usamos --prod=false
COPY --chown=nodeuser:nodeuser package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copiamos solo los artefactos construidos
COPY --from=builder --chown=nodeuser:nodeuser /app/dist ./dist

# Exponer puerto fijo (Docker no expande variables aquí)
EXPOSE 8080

# Healthcheck contra el puerto (Railway asigna $PORT)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/" || exit 1

# Ejecución en modo preview sirviendo dist
CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port ${PORT}"]