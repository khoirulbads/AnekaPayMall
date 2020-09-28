const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },    
    nama: {
    type: String,
    required: 'This field is required.'
    },
    level: {
        type: String
    },

});

// Custom validation for email

mongoose.model('user', userSchema);