FROM registry.access.redhat.com/ubi8/nodejs-16-minimal

ENV TZ="Europe/Helsinki"

WORKDIR /opt/app-root/src

# Setup
COPY package* ./
COPY tsconfig.json ./
RUN npm ci -f --omit-dev --ignore-scripts
COPY src ./src

# Build
RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
