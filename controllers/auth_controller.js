const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');
var sess 


router.get('/login', (req, res) => {
    res.render("Admin/login");

});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/auth/login");

});

router.post('/actionlogin',async (req, res) => {
    sess = req.session;
    try{
        let user  = await User.findOne({email:`${req.body.Email}`,password:`${req.body.Password}`})
        if(user.level=='admin'){
            sess._id = user._id;
            sess.email = user.email;
            sess.nama = user.nama;
            sess.password = user.password;
            sess.level = user.level;

            res.redirect('/admin/dashboard');
        }else if(user.level=='agen'){
            sess._id = user._id;
            sess.email = user.email;
            sess.nama = user.nama;
            sess.password = user.password;
            sess.level = user.level;

            res.redirect('/agen/beranda');
        }
    }catch(e){
        res.render('Admin/login',{
            message:"email atau password salah"
        })
    }
})

module.exports = router;