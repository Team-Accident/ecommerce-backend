const uuid = require("uuid");
const yup = require("yup");

const subCategoryRepository = require("../repositories/subCategoryRepository");
const generateOutput = require("../utils/outputFactory");

const subCategoryAddSchema = yup.object().shape({
  categoryId: yup.string().required(),
  name: yup.string().required(),
});

async function getSubCategoriesForParentId(parentId) {
  try {
    const res = await subCategoryRepository.getSubCategoriesForParentId(
      parentId
    );
    return generateOutput(200, "Categories fetched", {
      subCategories: res.rows,
    });
  } catch (error) {
    return generateOutput(500, "Internal Server Error", { error });
  }
}

async function addSubCategory(values) {
  try {
    await subCategoryAddSchema.validate({
      ...values,
    });
  } catch (error) {
    return generateOutput(400, "Validation Error!", error.errors);
  }

  const category = {
    sub_category_id: uuid.v4(),
    ...values,
  };
  try {
    const res = await subCategoryRepository.addSubCategory(category);
    return generateOutput(201, "Sub category added succesfully!", { category });
  } catch (error) {
    return generateOutput(500, "Error in adding the sub category", error);
  }
}

module.exports = {
  addSubCategory,
  getSubCategoriesForParentId,
};
