const Eucountry = require('mongoose').model('Eucountry');

module.exports = function(router) {
    router.get('/eucountry', getEucountry)
          .post('/eucountry', createCountry)
          .put('/eucountry/:alphacode', updateEucountry)
          .delete('/eucountry/:alphacode', deleteEucountry)
}

function createCountry(req, res) {
    let cntr = req.body.country;

    if(!cntr) {
        res.send({code: 426, message: 'unble to get country from request body'})
        return false;
    }

    let euCntr = new Eucountry(cntr);
    euCntr.save((err, cntr) => {
        if (err) {
            res.status(500).send({code: 500, message: err.message});   
            console.log(err);
            return;
        }
          else {

          res.status(201).send({code: 201, message: 'user has been registered successfully', data: cntr});
          return;
          }
    })
    
}

function getEucountry(req, res) {
    Eucountry.find({}, (err, cntries) => {
        if (err) { res.status(426).send({code: 426, message: 'Unable to get country', data: null});
    return; }
        res.status(200).json(cntries);
    })
}

function updateEucountry (req, res) {
    let data = req.body.country;
    let code = req.prams.alphacode;
    Eucountry.findByIdAndUpdate( {code: code}, data, (err, cntr) => {
        if (err){
            res.status(426).send({code: 426, message: 'Unable to update country', data: err});
            return ;
        } else {
            res.status(200).send({code: 201, message: 'User data has been updated', data: user});
            return;
        }
    })
}

function deleteEucountry (req, res){

    let code = req.params.alphacode;
    Eucountry.findOneAndDelete({code: code}, (err, done) => {
        if (err) { res.status(426).send({code: 426, message: 'Unable to delete country', data: err});
    return}
        else {
            res.status(200).send({code: 200, message: 'User has been deleted'});
            return;
        }
    })

}