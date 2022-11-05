FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["node", "server.js"]

# docker run -p 8080:8080 mori/nodejs