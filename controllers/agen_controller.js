const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Produk = mongoose.model('produk');
const Penjualan = mongoose.model('penjualan');
const User = mongoose.model('user');
const Kategori = mongoose.model('kategori');
const Kurir = mongoose.model('kurir');
const Distributor = mongoose.model('distributor');

var sess;

//dashboard
router.get('/beranda',async (req, res) => {
    sess = req.session;
    if (sess.level=="agen") {
            res.render("Agen/Beranda", {
                    message : sess.nama
                    });
    }else{
        res.redirect('/auth/logout');
    }
});


//tampil produk
router.get('/produk',async (req, res) => {
    sess = req.session;
    if (sess.level=="agen") {
        try{
            let produk    = await Produk.find({active:1})       
            res.render("Agen/Produk", {
                        message : sess.nama, produk:produk
                });
        }catch(e){
            res.render('error')
        }
        }else{
        res.redirect('/auth/logout');
    }
});


//tambah keranjang
router.post('/addKeranjang',async (req,res)=>{
    req.session;
    if(!req.session.cart){
        req.session.cart = []; 
    }
    await req.session.cart.push({
        produk:req.body._id,
        agen:req.session._id,
        nama:req.body.Nama,
        deskripsi:req.body.Deskripsi,
        jumlah:req.body.Jumlah,
        harga_beli:req.body.HargaBeli,
        harga_jual:req.body.HargaJual,
        laba:req.body.Laba,
        kategori:req.body.Kategori,
        sub_kategori:req.body.SubKategori,
        sub_total:req.body.HargaJual*req.body.Jumlah
    });
    res.redirect('/agen/keranjang');
})

//tampil keranjang
router.get('/keranjang',async (req,res)=>{
    req.session;
    if(req.session.level=='agen'){
        let kurir = await Kurir.find()
    if(!req.session.cart){
        await res.render('Agen/Keranjang',{
            keranjang: req.session.cart,
            message: req.session.nama,
            total: harga2,
            kurir: kurir
        });
    }else{
        var harga1 = 0
        var harga2 = 0
        for (let i = 0; i < req.session.cart.length; i++) {
        var harga = req.session.cart[i].harga_jual;
        var jumlah = req.session.cart[i].jumlah
        harga1 = harga * jumlah
        harga2 = harga2+harga1
        }
        await res.render('Agen/Keranjang',{
            keranjang: req.session.cart,
            message: req.session.nama,
            total: harga2,
            kurir:kurir
      })
    } 
    }else{
    res.redirect('/auth/logout');
    }
})

//cekout
router.get('/checkout',async(req,res)=>{
    req.session;
    for(let i =0;i < req.session.cart.length; i++){
        var penjualan = new Penjualan();
        penjualan.produk = await req.session.cart[i].produk
        penjualan.agen = await req.session.cart[i].agen
        penjualan.nama_agen = req.session.nama
        penjualan.nama = await req.session.cart[i].nama
        penjualan.deskripsi = await req.session.cart[i].deskripsi
        penjualan.jumlah = await req.session.cart[i].jumlah
        penjualan.harga_beli = await req.session.cart[i].harga_beli
        penjualan.harga_jual = await req.session.cart[i].harga_jual
        penjualan.laba = await req.session.cart[i].laba
        penjualan.kategori = await req.session.cart[i].kategori
        penjualan.sub_kategori = await req.session.cart[i].sub_kategori
        penjualan.total = await req.session.cart[i].harga_jual*req.session.cart[i].jumlah
        penjualan.tanggal = Date.now()
        penjualan.inv = Math.random()
        penjualan.tipePengiriman = "kurir"
        penjualan.kurir = "5f719b6fe16b07a210bde42c"
        penjualan.ongkir = 1000
        penjualan.nama_kurir = "kurir 1"
        penjualan.nohp_kurir = "08979787262"
        penjualan.status = "dikemas"
        await penjualan.save()
    }

    req.session.cart = [];
    res.redirect('/agen/beranda')
})

module.exports = router;