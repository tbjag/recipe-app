FROM node:18-alpine
ENV PORT 3000

WORKDIR /code
COPY ./package.json ./yarn.lock /code/
COPY ./ /code/

RUN yarn install
RUN yarn prisma generate

EXPOSE ${PORT}