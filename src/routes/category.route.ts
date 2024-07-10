import express from "express";
import CategoryService from "../services/category.service";
import validatorHandler from "../middlewares/validator.handler";
import { createCategorySchema, getCategoryByName, getCategorySchema, updateCategorySchema } from "../schemas/category.schema";

const categoryRouter = express.Router()

const categoryService = new CategoryService()

categoryRouter.get("/", (req, res) => {
  const categories = categoryService.getAllCategories()
  res.json(categories)
});

categoryRouter.get(
  "/:id",
  validatorHandler(getCategorySchema, "params"), 
  (req, res, next) => {
  try {
    const { id } = req.params
    const category = categoryService.getCategoryById(id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get(
  "/name/:name",
  validatorHandler(getCategoryByName, "params"), 
  (req, res, next) => {
  try {
    const { name } = req.params
    const category = categoryService.getCategoryByName(name)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

categoryRouter.post(
  "/",
  validatorHandler(createCategorySchema, "body"), 
  (req, res, next) => {
  try {
    const category = categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
})

categoryRouter.put(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"), 
  (req, res, next) => {
  try {
    const { id } = req.params
    const category = categoryService.updateCategory(id, req.body)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

categoryRouter.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"), 
  (req, res, next) => {
  try {
    const { id } = req.params
    const category = categoryService.deleteCategory(id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
})

export default categoryRouter;
