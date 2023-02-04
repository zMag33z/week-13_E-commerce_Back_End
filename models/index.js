//  Requiring all models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Call References of Foreign keys to Primary keys.
// Certain Products belong to one Certain Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// A Single Category can have Many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belong to Many Tags through specific Product-tag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags belong to Many Products through specific Product-tag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};