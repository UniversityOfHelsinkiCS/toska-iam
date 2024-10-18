FROM node:20

ENV TZ="Europe/Helsinki"

WORKDIR /usr/src/app

COPY package* ./
RUN npm i

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
