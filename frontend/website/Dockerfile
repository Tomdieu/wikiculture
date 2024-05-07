FROM node:node:20.11.0-alpine3.19

WORKDIR /client

COPY package*.json ./

RUN npm install

EXPOSE 3000

RUN npm run build

CMD npm start