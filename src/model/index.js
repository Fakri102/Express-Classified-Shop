import db from '../config/database.js'
import userModel from './user.model.js'
import catagoryModel from './category.model.js'
import productModel from './product.model.js'
import imageModel from './image.model.js'

db.user = userModel(db.sequelize, db.Sequelize)
db.category = catagoryModel(db.sequelize, db.Sequelize)
db.product = productModel(db.sequelize, db.Sequelize)
db.image = imageModel(db.sequelize, db.Sequelize)

db.product.hasMany(db.image, {
    foreignKey : 'product_id'
})

db.product.belongsTo(db.user, {
    foreignKey : 'user_id'
})

db.category.hasMany(db.product, {
    foreignKey : 'category_id'
})

db.user.hasMany(db.product, {
    foreignKey : 'user_id'
})

export default db