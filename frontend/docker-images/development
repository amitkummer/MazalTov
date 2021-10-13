FROM node:14.17-alpine3.14

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENTRYPOINT ["npm"]
CMD ["run", "dev"]
