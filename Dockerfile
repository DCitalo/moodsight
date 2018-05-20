FROM node:carbon
WORKDIR /usr/src/moodsight
COPY package*.json ./
RUN npm install --silent --progress=false 
COPY . .
CMD [ "npm", "start" ]