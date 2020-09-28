const mongoose = require('mongoose');

var kurirSchema = new mongoose.Schema({
    nama: {
        type: String
    },
    nohp: {
        type: String
    },
    alamat:{
        type: String
    },
    area: {
        type: String
    }
});

mongoose.model('kurir', kurirSchema);