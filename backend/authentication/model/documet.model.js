const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    chunksize: String,
    filename: String,
    uploaded: Date,
    docs: Array,
    type: String,
    data: Buffer
})

mongoose.model('Doc', docSchema);