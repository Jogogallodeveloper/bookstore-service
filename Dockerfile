# ========== Stage 1: deps ==========
FROM node:20-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
ca-certificates \
&& rm -rf /var/lib/apt/lists/*


# Copia apenas manifests para cache eficiente
COPY package*.json ./


# Se usa npm
RUN npm ci --omit=dev


# ========== Stage 2: builder (se TypeScript) ==========
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
# Se projeto for TS, gere build. Se for JS puro, comente esta linha.
RUN npm run build


# ========== Stage 3: runner ==========
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
PORT=3000 \
HEALTHCHECK_PATH=/health


# Usuário não-root por segurança
RUN useradd -m -u 1001 nodejs \
&& apt-get update && apt-get install -y --no-install-recommends curl \
&& rm -rf /var/lib/apt/lists/*


# Copiar apenas o necessário
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=builder /app/dist ./dist


EXPOSE 3000


# Healthcheck simples (ajuste HEALTHCHECK_PATH se necessário)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
CMD curl -fsS http://localhost:${PORT}${HEALTHCHECK_PATH} || exit 1


# Comando padrão (NestJS)
CMD ["npm", "run", "start:prod"]