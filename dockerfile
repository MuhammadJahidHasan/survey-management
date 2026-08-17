FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn build


FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./

# For modern Yarn
RUN yarn workspaces focus --all --production

COPY --from=builder /app/dist ./dist

USER node

CMD ["node", "dist/server.js"]