FROM node:4

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www/
RUN npm install

COPY . /www

# use nodemon for development
RUN npm install --global nodemon
CMD [ "nodemon", "start" ]

# CMD ["nodemon", "-L", "/www"]
# CMD [ "npm", "start" ]
