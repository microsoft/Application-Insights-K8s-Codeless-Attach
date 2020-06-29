FROM mhart/alpine-node:slim-8

WORKDIR  /mutating-webhook

COPY . /mutating-webhook
#RUN npm installdo

EXPOSE 1337
CMD [ "node", "server" ]