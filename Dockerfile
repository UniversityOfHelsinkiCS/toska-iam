FROM node:18-alpine

ENV TZ="Europe/Helsinki"

WORKDIR /usr/src/app

COPY package* ./
RUN npm ci --only=production
COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
