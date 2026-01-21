FROM node:20-alpine

WORKDIR /app

COPY services/user/package*.json ./services/user/
RUN cd services/user && npm install

COPY services/user ./services/user
COPY shared ./shared

RUN cd services/user && npm run build

EXPOSE 4002

CMD ["node", "services/user/dist/server.js"]
