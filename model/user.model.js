import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import Order from "./order.model.js";
import Product from "./product.model.js";
import Comment from "./comment.model.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INT,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regionId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "region",
      key: "id",
    },
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("USER", "ADMIN", "SUPERADMIN", "SELLER"),
    allowNull: false,
    defaultValue: "USER",
  },
}, {
  timestamps: false,
});

User.belongsTo(Region, { foreignKey: "regionId", as: "region" });
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
User.hasMany(Product, { foreignKey: "authorId", as: "products" });
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });

export default User;
