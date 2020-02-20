const password = require('../controllers/password.reset.controller');

module.exports = function(router) {
    router.post('/get_access_code', password.resetPassPhone)
          .post('/verify_password/:access_code', password.saveNewPassword);
}