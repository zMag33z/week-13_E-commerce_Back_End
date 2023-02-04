//  Create paths with router.
//  Require- four classes to sequelize Model constructor.
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// GET all products
// http://localhost:3001/api/products/
router.get('/', async (req, res) => {
  try {
    const allProducts = await Product.findAll({
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        include: [
          {
            model: Category,
            attributes: ['id', 'category_name']
          },
          {
            model: Tag,
            attributes: ['id', 'tag_name']
          }
        ]
    });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET single product by id
// http://localhost:3001/api/products/1
router.get('/:id', async (req, res) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name']
        }
      ]
    });

    if (!singleProduct) {
      res.status(404).json({ message: 'Category not found!' });
      return;
    }

    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST response to request create per specifics
// http://localhost:3001/api/products/
router.post('/', (req, res) => {
  /* req.body should look like this...
{
  "product_name": "Basketball",
	"price": 200.00,
	"stock": 3,
	"tagIds": [1, 2, 3, 4]
}
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json();
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// PUT response to request to update product by id
// http://localhost:3001/api/products/8
/*
{
  "product_name": "Basketball",
 	"price": 48.95,
 	"stock": 3,
 	"tagIds": [3, 4, 5]
}
 */
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // runs both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});


// DELETE response to request to remove product by id
// http://localhost:3001/api/products/8
router.delete('/:id', async (req, res) => {
  try {
    const removeCategory = await Product.destroy({
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