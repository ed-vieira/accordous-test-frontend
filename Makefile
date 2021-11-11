docker_network=admin_app_network

install:
	docker network inspect $(docker_network) > /dev/null 2>&1 || \
	docker network create -d bridge $(docker_network)
	docker-compose up --build

start:
	docker-compose up

stop:
	docker-compose stop

build:
	docker-compose up --build -d
