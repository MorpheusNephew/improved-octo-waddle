FROM node:18.17.1-alpine

WORKDIR /user/src/app

COPY . .

RUN npm install -g @nestjs/cli@10.1.15

RUN npm ci

RUN npm run build

RUN npm prune --omit=dev

RUN chmod -R 777 schema.gql

USER node

CMD ["npm", "run", "start:prod"]
