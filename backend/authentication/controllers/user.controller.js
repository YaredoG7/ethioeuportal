// get user model
const User = require('mongoose').model('User');
const Msg = require("mongoose").model("Msg");
const async = require("async");
const uuidv4 = require("uuid/v4");

exports.register = (req, res, next) => {
    let device = req.cookies.vit_device;
    if (device) {
        let cookie_data = JSON.parse(device);
        // console.log(cookie_data);
        let device_data = {device_name: cookie_data.device_name, device_os: cookie_data.device_os, device_id: cookie_data.device_id }

        User.findByIdAndUpdate(
            {
                email: cookie_data.email
            }, 
            {
                $push: { device_list: device_data}
           }, function(err, user) {
                if(err) {return next(err)};

                res.status(201).send({code: 201, message: 'Device has been registred', data: user});
                return;
           })
            
        } else {
            res.status(426).send({code: 426, message: 'Unable to read cookie data'})
            next();
        }
}

exports.updateUser = (req, res, next) => {
    let userId = req.params.userId;
    let data = req.body.data;
    delete data.password
 
    User.findOneAndUpdate( {vit_id: userId}, data, (err, user) => {
        if (err){
            res.status(426).send({code: 426, message: 'unable to update user'});  
             console.log(err)
            return;
        } else {
            res.status(201).send({code: 201, message: 'User data has been updated', data: user});
            return;
        }
    }, err => {
        res.status(426).send({code: 426, message: 'unable to update user', data: err});  
        return;
    })
}

exports.deleteUser = (req, res, next) => {
    // console.log(req.params.id)
    User.findOneAndDelete( {vit_id: req.params.id}, (err, done) => {
        if (err) {return next(err)}
        else {
            res.status(200).send({code: 200, message: 'User has been deleted'});
            return;
        }
    })
}

exports.getUser = (req, res, next) => {
    let email = req.params.email;
    if (email) {
        User.find({vit_id: email}, (err, user) => {
            if (err) { return next(err)}
            //   console.log(user);
            //  console.log(err)
            res.status(200).json(user);
        })
    } else {
        res.status(404).send({code: 404, message: 'user not found'});  
     return;
    }
}

exports.saveMessage = (req, res) => {
    let msg = req.body.msg;
    let userId = req.params.userId;
    Msg.update({vit_id: userId}, {
        $push: {message: msg}
    }, {upsert: true}, (err, message) => {
        if(err){
            console.log(err)
            return;
        }

        console.log(message);
        res.send({code: 201, message: 'Message has been saved'})
    }, )

}

exports.getMessage = (req, res) => {
    let userId = req.params.userId;
    Msg.find({vit_id: userId}, (err, msgs) => {
        if (err){
            res.send({code: 426, message: 'Uable to get messages'})
        }

        res.json(msgs)
    })
}
exports.getAll = (req, res, next) => {
    User.find({}, {password: 0}, (err, users) => {
        if (err) { return next(err)}
        res.status(201).json(users);
    })
}

 exports.deleteOne = (req, res, next) => {
    let user = req.params.email;
    let device = req.params.device_id;

    User.findOneAndUpdate( {
            email: user
    },
    {
        $pull: {device_list : {device_id: device} }
    }, function(err, user) {
        if (err) {return next(err)}
        if (user) {
            res.status(201).send({code: 201, message: 'device has been deleted'});
            return;
        }
    }
    )
 }

