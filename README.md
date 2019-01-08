#production
sudo docker-compose -f docker-compose.prod.yml run --rm rails_server rails db:create
sudo docker-compose -f docker-compose.prod.yml run --rm rails_server rails db:migrate
sudo docker-compose -f docker-compose.prod.yml run --rm rails_server rake secret

sudo docker-compose -f docker-compose.prod.yml up -d

#development
sudo docker-compose run --rm rails_server rails db:create
sudo docker-compose run --rm rails_server rails db:migrate
sudo docker-compose run --rm rails_server rake secret

sudo docker-compose up -d

#debug

Error: db_1 exited with code 2
Fix:
docker-compose rm
docker volume rm list_of_your_volumes
docker-compose up
---------------------

rm tmp/pids/server.pid
sudo docker stop vue_app_rails_server_1
sudo docker stop vue_app_db_1
sudo docker stop vue_app_node_server_1
docker-compose -f docker-compose.prod.yml up -d
