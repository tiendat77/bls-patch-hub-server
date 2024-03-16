# Install MongoDB with Docker

- Create `docker-compose.yaml` file

```yaml
services:
  mongodb:
    image: mongo
    container_name: mongodb
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - 27017:27017
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
```

- Add MongoDB service

```bash
docker-compose up -d
```
