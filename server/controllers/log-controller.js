let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");

const Log = require("../db").import("../models/log");

// Create Log
router.post("/create", validateSession, (req, res) => {
  const workoutLog = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner: req.user.id,
  };
  Log.create(workoutLog)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// Display All Logs
router.get("/", validateSession, (req, res) => {
  Log.findAll({
    where: { owner: req.user.id },
  })
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// Display Log by ID
router.get("/:id", validateSession, function (req, res) {
  Log.findAll({
    where: { id: req.params.id },
  })
    .then((log) => res.status(200).json({ log }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Update
router.put("/update/:id", validateSession, function (req, res) {
  const updateLog = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner: req.user.id,
  };
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Log.update(updateLog, query)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

// Delete
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };
  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log deleted." }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
