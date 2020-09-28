const mongoose = require('mongoose');

var produkSchema = new mongoose.Schema({
    nama: {
        type: String
    },
    deskripsi: {
        type: String
    },
    kategori: {
        type: String
    },
    subkategori: {
        type: String
    },
    stok: {
        type: Number
    },
    harga_beli: {
        type: Number
    },
    harga_jual: {
        type: Number
    },
    laba: {
        type: Number
    },
    active: {
        type: Number
    },
    deleteOn: {
        type: Date
    }
});


mongoose.model('produk', produkSchema);