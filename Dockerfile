FROM node:carbon
WORKDIR /usr/src/moodsight
COPY package*.json ./
RUN #!/bin/sh npm install --silent --progress=false 
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]