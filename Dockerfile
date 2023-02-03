FROM registry.access.redhat.com/ubi8/nodejs-16-minimal

ENV TZ="Europe/Helsinki"

WORKDIR /usr/src/app

# Setup
COPY package* ./
RUN npm ci -f --omit-dev --ignore-scripts
COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:prod"]
