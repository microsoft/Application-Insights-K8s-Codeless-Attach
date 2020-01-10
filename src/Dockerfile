FROM node:8-alpine3.10

WORKDIR  /mutating-webhook

COPY . /mutating-webhook
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]