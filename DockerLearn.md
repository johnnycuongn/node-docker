# Learn

[Youtube Link](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=34s)

Build image from Dockerfile
-t: --tag
```
docker build -t node-app-image .
```

Run image -> container
-v: bind mounts for development process - 1st -v mount current dir into /app - 2nd -v is anonymous volume, mount node_modules in docker
:ro = read only
-p: --publish
-d: detached mode, let container run in background
```
docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
```

Terminal(bash) in docker container
```
docker exec -it node-app bash
```

Remove container
-f force
-v remove attached volume
```
docker rm node-app -fv
```

## Docker compose


--build : Rebuild image 
```
docker-compose up -d --build
```

-v remove volume of image
```
docker-compose down -v
```

Certain compose file
``` 
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
## Production

# Working with Mongo

Add mongodb to services in docker-compose.yml file

Running mongo shell
```
docker exec -it <container_name> mongo -u "" -p ""
```

### Communicating between containers
```
# Find MONGO_IP by `docker inpsect container_name`
MONGO_IP: 127.68.0.2 | 'mongo'
MONGO_PORT: 27107
mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
```



### Authentication with Redis


# To Production

- Create a droplet (Ubuntu) on Digitaal Ocean
- SSH login (in terminal)
```
ssh root@<droplet-ip-address>
```

- Install docker on Ubuntu
```
curl -fsSL https://get.docker.com -o get-docker.sh
sh ./get-docker.sh
```

- Install docker-compose

- Set environment variable in docker-compose.prod by attaching to machine environment (Ubuntu)

### Create environement variable in Ubuntu (unsecured, sample only)
- create .env file (for sample, use /root), and add variables in

- add following code in .profile
```
set -o allexport; source /root/.env; set +o allexport;
```