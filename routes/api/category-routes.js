//  Requiring two classes and router received from api/index.js.
const router = require('express').Router();
const { Category, Product } = require('../../models');

//  GET all categories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

//  GET single category by id
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

// POST response to request of creating new category
router.post('/', (req, res) => {
  // create a new category
});

// PUT response to request to update category by id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

//  DELETE response to request to remove category by id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;