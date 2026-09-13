FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY index.js ./
COPY public ./public

ENV NODE_ENV=production
EXPOSE 3000

USER node

CMD ["node", "index.js"]
