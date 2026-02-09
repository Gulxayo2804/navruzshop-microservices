FROM node:20-alpine

WORKDIR /app

COPY services/inventory/package*.json ./services/inventory/
RUN cd services/inventory && npm install

COPY services/inventory ./services/inventory

RUN cd services/inventory && npm run build



CMD ["node", "services/inventory/dist/server.js"]
