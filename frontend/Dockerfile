FROM node:14.17-alpine3.14 AS build
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:14.17-alpine3.14
WORKDIR /frontend
COPY --from=build /frontend .
RUN rm -rf node_modules && npm ci --production
ENTRYPOINT ["npm"]
CMD ["run", "start"]
