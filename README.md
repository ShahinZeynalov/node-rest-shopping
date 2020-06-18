# node-rest-shopping

#download repo
> git clone https://github.com/ShahinZeynalov/node-rest-shopping.git

#change directory
> cd node-rest-shoping

#install dependencies
> npm install

#setup mongodb database for development via docker if not exists locally
> docker run --name mymongodb -p 27017:27017 -v /my/own/datadir:/data/db -d mongo:latest

#start project
> npm start