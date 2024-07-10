import Boom from "@hapi/boom";
import { Category } from "../models/Category";

class CategoryService {
  async getAllCategories() {
    const categories = await Category.find()
    return categories
  }

  async getCategoryById(id: string) {
    try {
      const category = await Category.findById(id)
      return category
    } catch (error) {
        throw Boom.notFound("Category not found")
    }
  }

  async getCategoryByName(name: string) {
    try {
      const category = await Category.findOne({ name })
      return category
    } catch (error) {
      throw Boom.notFound("Category not found")
    }
  }

  async createCategory(category: typeof Category) {
    try {
      const newCategory = await Category.create(category)
      return newCategory
    } catch (error) {
      throw Boom.badRequest("Error creating category")
    }
  }

  async updateCategory(id: string, category: typeof Category) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true })
      return updatedCategory
    } catch (error) {
      throw Boom.badRequest("Error updating category")
    }
  }

  async deleteCategory(id: string) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id)
      return deletedCategory
    } catch (error) {
      throw Boom.badRequest("Error deleting category")
    }
  }
}

export default CategoryService
