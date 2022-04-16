const express = require("express");
const router = express.Router();
const events = require("../models/event");

/* GET events. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await events.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting events `, err.message);
    next(err);
  }
});

module.exports = router;

