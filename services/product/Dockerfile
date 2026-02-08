FROM node:20-alpine

WORKDIR /app

COPY services/product/package*.json ./services/product/
RUN cd services/product && npm install

COPY services/product ./services/product
COPY shared ./shared

RUN cd services/product && npm run build

EXPOSE 4003

CMD ["node", "services/product/dist/server.js"]
