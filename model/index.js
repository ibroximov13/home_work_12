const {db} = require("../config/db");
require("./associations");

const User = require("./user.model")(db);
const Product = require("./product.model")(db);
const Comment = require("./comment.model")(db);
const Region = require("./region.model")(db);
const Order = require("./order.model")(db);
const OrderItem = require("./orderItem.model")(db);
const Category = require("./category.model")(db);

module.exports = {
    db,
    User, 
    Product,
    Comment,
    Region,
    Order,
    OrderItem,
    Category
}