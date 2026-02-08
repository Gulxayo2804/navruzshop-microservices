FROM node:20-alpine

WORKDIR /app

COPY services/order/package*.json ./services/order/
RUN cd services/order && npm install

COPY services/order ./services/order
COPY shared ./shared

RUN cd services/order && npm run build

EXPOSE 4004

CMD ["node", "services/auth/dist/server.js"]
