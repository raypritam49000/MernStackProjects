const Category = require('../models/Category');
const { Validator } = require('node-input-validator')

class CategoryController {

    static createCategory = async (req, res) => {
        try {
            const v = new Validator(req.body, {
                slug: 'required',
                name: 'required'
            });

            const matched = await v.check();

            if (!matched) {
                return res.status(404).json({ isSuccess: false, state: "Bad Request", statusCode: 422, "message": "Validation Error", errors: v.errors });
            }

            const category = new Category({
                name:req.body.name,
                slug:req.body.slug
            });

            const createCategory = await category.save();

            return res.status(201).json({ isSuccess: true, state: "Success", statusCode: 201, "message": "Category has been created", data: createCategory });
        }
        catch (error) {
            return res.status(500).json({ isSuccess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error", errors: error });
        }
    }
}

module.exports = CategoryController;