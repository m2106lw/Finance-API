FROM node:alpine

WORKDIR /usr/app

RUN apk add --no-cache --virtual .build-deps git

RUN git clone https://github.com/m2106lw/Finance-API.git
RUN apk del .build-deps
RUN ls /usr/app/Finance-API

WORKDIR /usr/app/Finance-API
COPY config.js .
RUN npm install --only=production

EXPOSE 8080

CMD npm start