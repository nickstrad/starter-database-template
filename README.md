# Requirements
- docker
- node

# Initial Setup
1. Install dependencies
```
npm i 
```

# Setup env for local dev
1. Start docker

# Start db
```
make db/start
```

# Login to db
```
# get container id
docker ps

# login to container
docker exec -it <contianer id> bash

# in container
psql -U <USER> <DB_NAME>

#verify tables after logging into postgres
\dt
```

# Run script

```
make db/seed
```
