FROM node:12

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

ENV TZ=America/Chicago
EXPOSE 3000
CMD [ "npm", "run","start" ]