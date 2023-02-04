//  Create paths with router.
//  Require- two classes to sequelize Model constructor.
const router = require('express').Router();
const { Category, Product } = require('../../models');


//  GET all categories
// http://localhost:3001/api/categories
router.get('/', async (req, res) => {
  try {
    const allproductCategories = await Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        ]
    });
    res.status(200).json(allproductCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});


//  GET single category by id
// http://localhost:3001/api/categories/1
router.get('/:id', async (req, res) => {
  try {
    const productsByCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });

    if (!productsByCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    res.status(200).json(productsByCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST response to request of creating new category
// http://localhost:3001/api/categories
// {
//   "category_name": "underwear"
// }
router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT response to request to update category by id
// http://localhost:3001/api/categories/6
// {
//   "category_name": "undergarments"
// }
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body.category_name);
    const updateCategory = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    );

    if (!updateCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


//  DELETE response to request to remove category by id
// http://localhost:3001/api/categories/6
router.delete('/:id', async (req, res) => {
  try {
    const removeCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!removeCategory) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    res.status(200).json(removeCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;