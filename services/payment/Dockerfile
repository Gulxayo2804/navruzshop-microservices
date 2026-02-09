FROM node:20-alpine

WORKDIR /app

COPY services/payment/package*.json ./services/payment/
RUN cd services/payment && npm install

COPY services/payment ./services/payment

RUN cd services/payment && npm run build


CMD ["node", "services/payment/dist/server.js"]
