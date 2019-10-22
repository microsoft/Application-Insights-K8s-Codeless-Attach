FROM node:8-slim

WORKDIR /codelessAttachNode

COPY . /codelessAttachNode
RUN npm install

EXPOSE 1337
CMD [ "npm", "start" ]