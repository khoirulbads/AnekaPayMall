const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Produk = mongoose.model('produk');
const User = mongoose.model('user');
const Kategori = mongoose.model('kategori');
const Kurir = mongoose.model('kurir');

var sess 

router.get('/dashboard',async (req, res) => {
    sess = req.session;
    if (sess.level=="admin") {
    let us  = await User.countDocuments({level:'member'})
    let pr  = await Produk.countDocuments({active:1})
        res.render("Admin/Dashboard", {
                    message : sess.nama, y:us, z:pr, date:Date.now()
                    });
        }else{
        res.redirect('/auth/logout');
    }
});

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

router.get('/delProduk/:id', async (req,res)=>{
    await Produk.findOneAndUpdate({_id:`${req.params.id}`},{active:0,deleteOn:Date.now()},{new:true})
    res.redirect('/admin/produk');
})

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

router.get('/delKurir/:id', async (req,res)=>{
    await Kurir.findOneAndRemove({_id:`${req.params.id}`})
    res.redirect('/admin/kurir');
})

router.post('/updateKurir/:id', async (req,res)=>{
    await Kurir.findOneAndUpdate({_id:`${req.params.id}`},{
        nama : req.body.Nama,
        nohp : req.body.Nohp,
        alamat : req.body.Alamat,
        area : req.body.Area,},{new:true})
    res.redirect('/admin/kurir')
})

module.exports = router;