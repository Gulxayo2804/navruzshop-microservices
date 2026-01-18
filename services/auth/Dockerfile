FROM node:20-alpine

WORKDIR /app

COPY services/auth/package*.json ./services/auth/
RUN cd services/auth && npm install

COPY services/auth ./services/auth
COPY shared ./shared

RUN cd services/auth && npm run build

EXPOSE 4001

CMD ["node", "services/auth/dist/server.js"]
