const express = require("express");
const morgan = require("morgan");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS || "127.0.0.1";

app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(express.json());

const redisClient = redis.createClient({ host: REDIS_HOST });
redisClient.on("error", function (error) {
	console.error(error);
});
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const redisDbSize = promisify(redisClient.dbsize).bind(redisClient);

const redisPrefixKey = (id) => {
	return `B1NXYZ-${id}`;
};

app.get("/alb-health-check", (req, res) => {
	res.send("ok");
});

app.post("/new", async (req, res) => {
	const id = Math.floor(Math.random() * 9000 + 1000);
	const bin = req.body.bin;
	await redisSet(redisPrefixKey(id), bin, "EX", 60);
	res.json({ id });
});

app.get("/get", async (req, res) => {
	const id = req.query.id;
	if (!id || !parseInt(id, 10)) {
		return res.status(400).send("Invalid ID");
	}
	const response = await redisGet(redisPrefixKey(id));
	if (!response) {
		return res.status(404).send("Expired or invalid ID");
	}
	res.send(response);
});

app.get("/size", async (req, res) => {
	const response = await redisDbSize();
	res.json({ size: response });
});

app.use(function (req, res) {
	res.status(404).send("404: Page not found");
});

app.use(function (error, req, res, next) {
	console.log(error);
	res.status(500).send("500: Internal server error");
});

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
