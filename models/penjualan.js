const mongoose = require('mongoose');

var penjualanSchema = new mongoose.Schema({
    produk: {
        type: String
    },
    agen: {
        type: String
    },

    nama_agen: {
        type: String
    },
    nama: {
        type: String
    },
    deskripsi: {
        type: String
    },
    jumlah: {
        type: Number
    },
    harga_beli: {
        type: Number
    },
    harga_jual:{
        type: Number
    },
    laba:{
        type: Number
    },
    kategori: {
        type: String
    },
    sub_kategori:{
        type: String
    },
    tanggal: {
        type: Date
    },
    inv: {
        type: String
    },
    total:{
        type:Number
    },
    tipePengiriman:{
        type:String
    },
    kurir:{
        type: String
    },
    ongkir: {
        type: Number
    },
    nama_kurir:{
        type:String
    },
    nohp_kurir:{
        type: Number
    },
    status:{
        type:String
    }
});


mongoose.model('penjualan', penjualanSchema);