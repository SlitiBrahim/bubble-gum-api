FROM node:10-alpine

WORKDIR /home/docker

RUN npm install && \
    npm cache clean --force

CMD ["npm", "run", "dev"]