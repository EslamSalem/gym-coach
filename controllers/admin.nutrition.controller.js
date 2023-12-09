const Nutrition = require("../models/nutrition.model");
const User = require("../models/user.model");

async function getNutrition(req, res, next) {
  let nutrition;
  let admin;

  try {
    nutrition = await Nutrition.getAllNutrition();
    admin = await User.getUserByID(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  res.render("admin/manage-nutrition", {
    nutrition: JSON.stringify(nutrition),
    admin: admin,
  });
}

async function addNutrition(req, res, next) {
  const nutritionName = req.body.name;
  let nutrition = new Nutrition(nutritionName);

  try {
    const insertResult = await nutrition.save();
    const nutritionID = insertResult.insertedId.toString();
    nutrition = await Nutrition.getNutritionByID(nutritionID);
  } catch (error) {
    return next(error);
  }

  res.json({
    addedNutrition: nutrition,
  });
}

async function deleteNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
    await nutrition.delete();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

async function getUpdateNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
  } catch (error) {
    return next(error);
  }
  res.render("admin/update-nutrition", {
    nutrition: JSON.stringify(nutrition),
  });
}

async function updateNutrition(req, res, next) {
  const nutritionID = req.params.id;

  let nutrition;
  try {
    nutrition = await Nutrition.getNutritionByID(nutritionID);
    nutrition.name = req.body.name;
    nutrition.meals = req.body.meals;
    await nutrition.save();
  } catch (error) {
    return next(error);
  }

  res.json({});
}

module.exports = {
  getNutrition: getNutrition,
  addNutrition: addNutrition,
  deleteNutrition: deleteNutrition,
  getUpdateNutrition: getUpdateNutrition,
  updateNutrition: updateNutrition,
};
