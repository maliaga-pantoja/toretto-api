FROM node:12
WORKDIR /app
COPY package.json ./
RUN npm i
COPY src ./src
CMD ["npm", "start"]