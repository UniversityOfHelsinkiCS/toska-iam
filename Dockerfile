FROM registry.access.redhat.com/ubi9/nodejs-20-minimal AS build

ENV TZ="Europe/Helsinki"

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/app-root/src

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --include=dev

COPY src ./src

RUN npm run build


FROM registry.access.redhat.com/ubi9/nodejs-20-minimal

ENV TZ="Europe/Helsinki"

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/app-root/src

COPY --from=build /opt/app-root/src/package*.json ./
COPY --from=build /opt/app-root/src/build ./build

RUN npm ci --omit=dev

EXPOSE 3003

CMD ["node", "build/index.js"]
