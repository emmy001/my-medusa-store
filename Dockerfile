# Development Dockerfile for Medusa
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy source code
COPY . .

COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Build all TS -> JS (backend + plugins)
RUN yarn build

EXPOSE 9000

# Entrypoint will run migrations before starting server
#CMD ["sh", "-c", "yarn medusa migrations run && ./start.sh"]
CMD ["sh", "-c", "yarn medusa db:migrate && ./start.sh"]

