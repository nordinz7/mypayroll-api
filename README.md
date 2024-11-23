# api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.25. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

To run test: make sure to create database manually as defined in `POSTGRES_DB_TEST`=> `app.config.ts`

### Docker

1. ensure HOSTNAME is set to `0.0.0.0` in `.env`
2. ensure POSTGRES_HOST is set to correct ip address in `.env`

To rebuild restart the container dc down && dc up -d --build

3. ERROR: for mypayroll-api_db_1 'ContainerConfig'

- docker ps -a
- docker rm <container_id>
