# vue_app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Build server

``` bash

#production
sudo docker-compose -f docker-compose.prod.yml run --rm web rails db:create
sudo docker-compose -f docker-compose.prod.yml run --rm web rails db:migrate
sudo docker-compose -f docker-compose.prod.yml run --rm web rake secret

sudo docker-compose -f docker-compose.prod.yml up -d

#development
sudo docker-compose run --rm web rails db:create
sudo docker-compose run --rm web rails db:migrate
sudo docker-compose run --rm web rake secret

sudo docker-compose up -d

#debug
rm tmp/pids/server.pid
docker stop server_web_1
docker stop server_db_1
```
