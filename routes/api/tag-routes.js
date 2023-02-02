//  Requiring only three models and router from routes/index.js
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//  GET all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

// GET response to request single tag by id
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

// POST response to request to create new tag to specifics
router.post('/', (req, res) => {
  // create a new tag
});

// PUT response to request to update tag by id
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

// DELETE reponse to request to remove tag by id
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;