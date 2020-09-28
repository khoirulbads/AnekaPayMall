const mongoose = require('mongoose');
/*
mongoose.connect('mongodb+srv://contoh:contoh@contoh.j800t.mongodb.net/contoh?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
*/

mongoose.connect('mongodb+srv://team1:ExcvymIRobL3PsS7@percobaan.alaon.mongodb.net/team1?authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});


require('./user');
require('./distributor');
require('./kurir');
require('./pembelian');
require('./penjualan');
require('./produk');
require('./kategori')