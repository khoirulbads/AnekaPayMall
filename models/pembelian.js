const mongoose = require('mongoose');

var pembelianSchema = new mongoose.Schema({
    distributorId: {
        type: String
    },
    nama: {
        type: String
    },
    jumlah: {
        type: String
    },
    harga_beli: {
        type: Number
    },
    tanggal: {
        type: Date
    },
    produkId: {
        type: String
    },
    inv:{
        type: String
    },
    status:{
        type: String
    }
});


mongoose.model('pembelian', pembelianSchema);