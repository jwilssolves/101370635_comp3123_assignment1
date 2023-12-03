const express = require("express");
const { UserModel } = require("../model/user_model");

const userRoute = express.Router();

userRoute.use((req, res, next) => {
    try {
        console.log(`USER PATH: ${req.url} ${req.hostname}`);
        const encrypted_password = Buffer.from(req.body.password).toString("base64");
        req.body.password = encrypted_password;
        return next();
    } catch (error) {
        return next(error);
    }
});

userRoute.post("/signup", async (req, res) => {
    try {
        const nuser = new UserModel(req.body);
        const result = await nuser.save();
        return res.status(201).send({ status: true, username: result.username, email: result.email });
    } catch (error) {
        return res.send({ status: false, error: error });
    }
});

userRoute.post("/login", async (req, res) => {
    try {
        let user;
        if (req.body.username.includes("@")) user = await UserModel.findOne({ username: req.body.email, password: req.body.password });
        else user = await UserModel.findOne({ username: req.body.username, password: req.body.password });
        console.log(user);

        if (!user) return res.status(200).send({ status: false, username: req.body.username, message: "User not found" });

        return res.status(200).send({ status: true, username: req.body.username, message: "User log in success" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, username: req.body.username, error: error });
    }
});

module.exports = { userRoute };