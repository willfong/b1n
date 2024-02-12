# b1n
One-Minute Bins

Check it out at https://b1n.xyz


## Docker Commands

Local Build

```sh
docker build -t b1n .
```

Local Start

```sh
docker run -d --name b1n -p 3000:3000 -e "REDIS=172.17.0.1" b1n
```

Local Redis

```sh
 docker run -d --name redis -p 6379:6379 redis
 ```
