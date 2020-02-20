const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: String,
    code: String,
    capital: String,
    borders: Array,
    currencies: String,
    flag: String,
    native: String,
    long_name: String,
    cost: {},
    aval_schlr: String,
    aval_uni: String,
    comment: {},
},  {
    collection: 'eu_countries'
})

mongoose.model('Eucountry', countrySchema)