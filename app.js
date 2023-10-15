const express = require("express");
// TODO: routes
const { userRoute } = require("./routes/user_route");
const { empRoute } = require("./routes/employee_route");

const app = express();

const api_path = "/api/v1";

app.use(express.json());
app.use((req, res, next) => {
    if (req.method === "POST") {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(500).send({ status: false, error: "Body is empty!" });
        }
        return next();
    }
    return next();
});
app.use(`${api_path}/user`, userRoute);
app.use(`${api_path}/employee`, empRoute);

app.get("/", (req, res) => res.status(200).send("<h1>Hello World</h1>"));

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).send({ status: false, message: err });
});

module.exports = { app };