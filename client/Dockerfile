FROM node:16.13.1-alpine3.14

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev
