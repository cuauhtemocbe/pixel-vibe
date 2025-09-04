#!/bin/sh

# Ensure pnpm is in PATH
export PATH="/home/node/.local/share/pnpm:$PATH"

# Source profile if it exists
if [ -f "$HOME/.profile" ]; then
    . "$HOME/.profile"
fi

# Run pnpm with all arguments passed to this script
exec pnpm "$@"
