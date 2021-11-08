import db from '../index.js'

const Category = db.category

function categorySeed() {
    Category.bulkCreate([
        { name: 'Automotive' },
        { name: 'Building' },
        { name: 'Computer' },
    ])
}

export default categorySeed
