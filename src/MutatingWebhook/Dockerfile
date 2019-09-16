FROM node:8-slim

WORKDIR  /mutating-webhook

COPY . /mutating-webhook
RUN npm install

VOLUME ["/vol/testVol"]

CMD ["mkdir", "/vol/testVol/agentConfig"]

EXPOSE 45686
CMD [ "npm", "start" ]