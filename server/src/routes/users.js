var express = require('express');
const { userCreate, userLogin, userSearch } = require('../controllers/user');
const { userAuth } = require('../middleware/jwtauth');
var router = express.Router();

/* GET users listing. */
router.post('/create', userCreate)
router.post('/login', userLogin)
router.get('/userSerach',userAuth, userSearch)

module.exports = router;
