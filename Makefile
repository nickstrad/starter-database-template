
include .env

.PHONY: db/start
db/start:
	docker run  \
		--rm \
		--name comment-analyzer \
		-e POSTGRES_DB=${DB_NAME} \
		-e POSTGRES_USER=${DB_USER} \
		-e POSTGRES_HOST_AUTH_METHOD=trust  \
		-p 5432:5432  \
		-v "$(PWD)/database/init":/docker-entrypoint-initdb.d \
		postgres

.PHONY: db/createUsers
db/createUsers:
	npx tsx scripts/createUsers.ts

.PHONY: db/getUsers
db/getUsers:
	npx tsx scripts/getUsers.ts
