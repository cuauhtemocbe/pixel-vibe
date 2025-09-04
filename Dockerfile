# ---------- Builder ----------
FROM node:20-alpine AS builder

RUN apk add --no-cache git
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run typecheck && pnpm run build


# ---------- Producción ----------
FROM node:20-alpine AS production

RUN apk add --no-cache curl
ENV NODE_ENV=production
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PORT=8080

RUN corepack enable && corepack prepare pnpm@latest --activate

# Usuario sin privilegios
RUN adduser -D -u 10001 nodeuser
USER 10001

WORKDIR /app

# Necesitamos vite (devDeps) porque usaremos "vite preview"
COPY --chown=nodeuser:nodeuser package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copiamos el build
COPY --from=builder --chown=nodeuser:nodeuser /app/dist ./dist

COPY --from=builder --chown=nodeuser:nodeuser /app/vite.config.ts ./vite.config.ts

# Exponer puerto fijo (Docker no expande variables en EXPOSE)
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/" || exit 1

# Servir dist con vite preview leyendo vite.config.ts (allowedHosts)
CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port ${PORT}"]