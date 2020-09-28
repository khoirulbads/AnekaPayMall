const mongoose = require('mongoose');

var kategoriSchema = new mongoose.Schema({
    nama: {
        type: String
    },
    sub: {
        type: String
    }
});

mongoose.model('kategori', kategoriSchema);