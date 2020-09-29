const mongoose = require('mongoose');

var distriSchema = new mongoose.Schema({
    nama: {
        type: String
    },
    alamat: {
        type: String
    },
    no_hp: {
        type: String
    },
    pemilik: {
        type: String
    }
});


mongoose.model('distributor', distriSchema);