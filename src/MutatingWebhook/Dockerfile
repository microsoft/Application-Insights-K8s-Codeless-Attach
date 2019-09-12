FROM node:8-slim

WORKDIR /MutatingWebhook

COPY . /MutatingWebhook
RUN npm install

EXPOSE 45686
CMD [ "npm", "start" ]