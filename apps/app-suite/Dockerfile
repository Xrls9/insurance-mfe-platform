FROM node:20-alpine AS builder

ARG APP_NAME


WORKDIR /app

COPY package.json package-lock.json nx.json tsconfig.base.json ./

COPY . /app

RUN npm install

RUN npx nx build ${APP_NAME} --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/apps/${APP_NAME} /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
