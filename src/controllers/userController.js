const express = require("express");
const authenticateToken = require("../middlewares/authorization");
const userService = require("../services/userService");

const router = express.Router();

router.get("/:ID", async (req, res) => {
  const result = await userService.getUserDetails(req.params.ID);
  res.status(200);
  res.send(result);
});

router.post("/signup", async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.send(result);
});

router.post("/signin", async (req, res) => {
  const result = await userService.signin(req.body.email, req.body.password);
  res.send(result);
});

router.get("/getuserorders/:ID", authenticateToken, async (req, res) => {
  const result = await userService.getUserOrders(req.params.ID);
  res.status(200);
  res.send(result);
});

module.exports = router;
