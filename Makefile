docker_network=admin_app_network

init:
	docker network inspect $(docker_network) > /dev/null 2>&1 || \
	docker network create -d bridge $(docker_network)
	docker-compose up --build

start:
	docker-compose up

stop:
	docker-compose stop
