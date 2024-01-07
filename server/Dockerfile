FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000


CMD ["node", "./dist/index.js"]