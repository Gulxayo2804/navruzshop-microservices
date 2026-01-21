FROM node:20-alpine

WORKDIR /app

COPY api-gateway/package*.json ./api-gateway/
RUN cd api-gateway && npm install

COPY api-gateway ./api-gateway
COPY shared ./shared

RUN cd api-gateway && npm run build

EXPOSE 3000

CMD ["node", "api-gateway/dist/server.js"]
