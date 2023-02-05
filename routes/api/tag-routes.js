//  Create paths with router.
//  Require- three classes to sequelize Model constructor.
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//  GET all tags
// http://localhost:3001/api/tags/
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        ]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// GET response to request single tag by id
// http://localhost:3001/api/tags/
router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });

    if (!singleTag) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// POST response to request to create new tag to specifics
// http://localhost:3001/api/tags/
/*
{
  "tag_name": "sports"
}
*/
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body.tag_name);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// PUT response to request to update tag by id
// http://localhost:3001/api/tags/9
/*
{
  "tag_name": "athletics"
}
*/
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body.category_name);
    const updateTag = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id,
        }
      }
    );

    if (!updateTag) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// DELETE reponse to request to remove tag by id
// http://localhost:3001/api/tags/9
router.delete('/:id', async (req, res) => {
  try {
    const removeTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!removeTag) {
      res.status(404).json({ message: 'Tag not found!' });
      return;
    }

    res.status(200).json(removeTag);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

module.exports = router;