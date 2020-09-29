const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Produk = mongoose.model('produk');
const User = mongoose.model('user');
const Kategori = mongoose.model('kategori');
const Kurir = mongoose.model('kurir');
const Distributor = mongoose.model('distributor');
const Penjualan = mongoose.model('penjualan');

var sess 

//dashboard
router.get('/dashboard',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
    let us  = await User.countDocuments({level:'agen'})
    let pr  = await Produk.countDocuments({active:1})
        res.render("Admin/Dashboard", {
                    message : sess.nama, y:us, z:pr, date:Date.now()
                    });
        }else{
        res.redirect('/auth/logout');
    }
});


//tampil produk
router.get('/produk',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
        try{
            let produk    = await Produk.find({active:1})
            let kategori  = await Kategori.find({})
       
            res.render("Admin/Data_Produk", {
                        message : sess.nama, produk:produk, kategori:kategori
                        });
        }catch(e){
            res.render('error')
        }
        }else{
        res.redirect('/auth/logout');
    }
});

//tambah produk
router.post('/addProduk', async (req, res) => {
    sess = req.session;
    let add = new Produk();
    add.nama = req.body.Nama;
    add.deskripsi = req.body.Deskripsi;
    add.kategori = req.body.Kategori;
    add.subkategori = "Kategori 1";
    add.stok = req.body.Stok;
    add.harga_beli = req.body.HargaBeli;
    add.harga_jual = req.body.HargaJual;
    add.laba = await add.harga_jual-add.harga_beli;
    add.active = 1;
    add.deleteOn = null;
    await add.save()
    res.redirect('/admin/produk');
})

//hapus produk
router.get('/delProduk/:id', async (req,res)=>{
    await Produk.findOneAndUpdate({_id:`${req.params.id}`},{active:0,deleteOn:Date.now()},{new:true})
    res.redirect('/admin/produk');
})

//ubah produk
router.post('/updateProduk/:id', async (req,res)=>{
    await Produk.findOneAndUpdate({_id:`${req.params.id}`},{
        nama:req.body.Nama,
        deskripsi:req.body.Deskripsi,
        kategori:req.body.Kategori,
        subkategori:"Kategori 2",
        stok:req.body.Stok,
        harga_beli : req.body.HargaBeli,
        harga_jual: req.body.HargaJual,
        laba : await req.body.HargaJual-req.body.HargaBeli},{new:true})
    res.redirect('/admin/produk')
})



//tampil kurir
router.get('/kurir',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
        try{
            let kurir  = await Kurir.find({})
       
            res.render("Admin/Data_Kurir", {
                        message : sess.nama, kurir:kurir
                        });
        }catch(e){
            res.render('error')
        }
        }else{
        res.redirect('/auth/logout');
    }
});

//tambah kurir
router.post('/addKurir', async (req, res) => {
    sess = req.session;
    let add = new Kurir();
    add.nama = req.body.Nama;
    add.nohp = req.body.Nohp;
    add.alamat = req.body.Alamat;
    add.area = req.body.Area;

    await add.save()
    res.redirect('/admin/kurir');
})

//hapus kurir
router.get('/delKurir/:id', async (req,res)=>{
    await Kurir.findOneAndRemove({_id:`${req.params.id}`})
    res.redirect('/admin/kurir');
})

//ubah kurir
router.post('/updateKurir/:id', async (req,res)=>{
    await Kurir.findOneAndUpdate({_id:`${req.params.id}`},{
        nama : req.body.Nama,
        nohp : req.body.Nohp,
        alamat : req.body.Alamat,
        area : req.body.Area,},{new:true})
    res.redirect('/admin/kurir')
})


//tampil distributor
router.get('/distributor',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
        try{
            let dis  = await Distributor.find({})
       
            res.render("Admin/Data_Distributor", {
                        message : sess.nama, distributor:dis
                        });
        }catch(e){
            res.render('error')
        }
        }else{
        res.redirect('/auth/logout');
    }
});

//tambah distributor
router.post('/addDistributor', async (req, res) => {
    sess = req.session;
    let add = new Distributor();
    add.nama = req.body.Nama;
    add.alamat = req.body.Alamat;
    add.no_hp = req.body.Nohp;
    add.pemilik = req.body.Pemilik;

    await add.save()
    res.redirect('/admin/distributor');
})

//hapus distributor
router.get('/delDistributor/:id', async (req,res)=>{
    await Distributor.findOneAndRemove({_id:`${req.params.id}`})
    res.redirect('/admin/distributor');
})

//ubah distributor
router.post('/updateDistributor/:id', async (req,res)=>{
    await Distributor.findOneAndUpdate({_id:`${req.params.id}`},{
        nama : req.body.Nama,
        nohp : req.body.Alamat,
        alamat : req.body.Nohp,
        area : req.body.Pemilik,},{new:true})
    res.redirect('/admin/distributor')
})



//tampil penjualan
router.get('/transaksi',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
        try{
            let pen  = await Penjualan.find({status:"dikemas"})
            let jul = await Penjualan.find({status:"diterima kurir"})
            res.render("Admin/Data_Transaksi", {
                        message : sess.nama, penjualan:pen, penjual:jul
                        });
        }catch(e){
            res.render('error')
        }
        }else{
        res.redirect('/auth/logout');
    }
});

//ubah status penjualan
router.get('/status/:id', async (req,res)=>{
    await Penjualan.findOneAndUpdate({_id:`${req.params.id}`},{status:"diterima kurir"},{new:true})
    res.redirect('/admin/transaksi');
})

module.exports = router;