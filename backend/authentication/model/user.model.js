/****************************************************************
 * Model that will be used for authentication, authorization and 
 * more stuff that is related to people that will be registerd
 * in the platform - Index has been set to email
 ****************************************************************/
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    address: {
        city: String,
        country: String,
        postcode: String,
        house_num: String
    },
    company: String,
    email: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
       // index: true,
       // match: [/.+\@.+\..+/, "Please fill a valid e-mail address"] // regex for the email 
    }, 
    role: String,
    password: {
        type: String, 
        required: true,
      //  minlength: 8,
       // maxlength: 20
       validate: [
        (password) =>{
            return password.length > 6;
        }, 
        'Password should be longer'
         ]
    }, 
    vit_id: {
        type: String,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
       // maxlength: 15
     },

     salt: {
        type: String
      }, 
 
    metadata : String,

    isActive: {
        type: Boolean,
        index: true
    },
    education_level: String,
    payment: String,
    has_paid: Boolean,
    education_level: String,
    first_payment: String,
    points: Number,
    star: Number,
    can_pay_eur: Boolean,
    certificate: String,
    app_status: String,
    preferred_cntry: String,
    accessToken: Number,
    tokenExpiry: Date
}, {
    collection: 'user_account'
});

userSchema.pre('save', function(next) {
    if(this.password) {
        this.salt = new  Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
}
    next();
});

userSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

userSchema.methods.roleCheck = function(role){
    return this.role === role;
}

userSchema.methods.isValidPassword = function(password) {
    return this.password === this.hashPassword(password);
}


userSchema.statics.userVitId = function(compid, suffix, callback) {
    const vitcompanyid = 'ETEU'
    let possibleId = vitcompanyid + (suffix || 100);
    this.findOne({
        vit_id: possibleId
    }, (err, user) => {

        // console.log(err, user)
        if (!err) {
            if(!user) {
                callback(possibleId);
            } else {
                return this.userVitId(compid, (suffix || 100) + 1, callback)
            }
        } else {
            callback(null);
        }
    })
}

mongoose.model('User', userSchema);



const msgSchema = new mongoose.Schema({
    vit_id: String,
    from: String,
    message: {
        type: Array,
        
    },
    subject: String,
    metadata: {},   
}, {
    collection: 'messages'
})


mongoose.model('Msg', msgSchema);

