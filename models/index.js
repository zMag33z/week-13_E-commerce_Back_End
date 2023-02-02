//  Requiring all models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Called References of foreign keys to Primary keys.
// Products belong to one Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// A Category can have many products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belong to many tags through specific product tag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags belong to many other product tags
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