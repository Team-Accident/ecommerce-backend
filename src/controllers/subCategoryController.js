const express = require("express");

const subCategoryService = require("../services/subCategoryService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.get("/parent/:id", async (req, res) => {
  const result = await subCategoryService.getSubCategoriesForParentId(
    req.params.id
  );
  res.status(200);
  res.send(result);
});

router.post("/add", async (req, res) => {
  const result = await subCategoryService.addSubCategory(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
