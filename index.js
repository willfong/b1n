const express = require("express");
const morgan = require("morgan");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.static("dist"));

app.post("/submit", (req, res) => {
    
})

app.use(function(req, res) {
    res.status(404).send("404: Page not found");
});

app.use(function(error, req, res, next) {
    console.log(error);
    res.status(500).send("500: Internal server error");
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});