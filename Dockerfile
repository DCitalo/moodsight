FROM node:8.9.4

RUN useradd --user-group --create-home --shell /bin/false app &&\
    npm install --global npm@5.6.0

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/MOODSIGHT/

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/MOODSIGHT
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY .$HOME/MOODSIGHT
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]