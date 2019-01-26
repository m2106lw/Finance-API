FROM node:10-alpine

LABEL author="Matthew Williams <me2106@gmail.com>"

# Create app directory
WORKDIR /usr/src/app 

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
COPY . . 

# Maybe look into pulling code from git
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
#RUN apk --no-cache --virtual add .build-deps add python make g++ && \
#    apk del build-dependencies && \
RUN apk add --no-cache --virtual .build-deps \
    make \
    gcc \
    g++ \
    python && \
    npm ci --only=production && \
    apk del .build-deps

EXPOSE 8080

CMD [ "npm", "start" ]