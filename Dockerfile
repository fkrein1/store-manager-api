FROM node:16.14
WORKDIR /home/node/app
COPY . .
EXPOSE 3000
RUN ["npm", "install"]