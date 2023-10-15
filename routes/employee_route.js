const express = require("express");
const { EmployeeModel } = require("../model/employee_model");

const empRoute = express.Router();


empRoute.get("/", async (req, res) => {
    try {
        return res.status(200).send(await EmployeeModel.find());
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, error: error });
    }
});

empRoute.post("/", async (req, res) => {
    try {
        const employee = new EmployeeModel(req.body);
        const dbres = await employee.save();
        return res.status(201).send(dbres);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, error: error });
    }
});

empRoute.get("/:eid", async (req, res) => {
    try {
        return res.status(200).send(await EmployeeModel.findOne({ _id: req.params.eid }));
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, error: error });
    }
});

empRoute.put("/:eid", async (req, res) => {
    try {
        const ndata = new EmployeeModel(req.body);
        const val = ndata.validateSync();
        if (!!val) throw val;

        const status = await EmployeeModel.updateOne({ _id: req.params.eid }, { $set: req.body });
        return res.status(200).send(status);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, error: error });
    }
});

// use query params
empRoute.delete("/", async (req, res) => {
    try {
        if (!req.query.eid) return res.status(500).send({ status: false, error: "eid was not provided." });
        const status = await EmployeeModel.deleteOne({ _id: req.query.eid });
        return res.status(200).send(status);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, error: error });
    }
});


module.exports = { empRoute };