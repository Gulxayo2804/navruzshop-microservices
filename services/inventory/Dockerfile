FROM node:20-alpine

WORKDIR /app

COPY services/inventory/package*.json ./services/inventory/
RUN cd services/inventory && npm install

COPY services/inventory ./services/inventory
COPY shared ./shared

RUN cd services/inventory && npm run build

EXPOSE 4002

CMD ["node", "services/inventory/dist/server.js"]
