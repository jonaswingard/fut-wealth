FROM node:6.9.5

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www/
RUN npm install

COPY . /www

CMD [ "npm", "run", "dev" ]
