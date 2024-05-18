var express = require('express');
const { converstionCreate, messageSend, converstionGet, messageGet } = require('../controllers/chat');
const { userAuth } = require('../middleware/jwtauth');
var router = express.Router();

/* GET users listing. */
router.post('/converstion/:id',userAuth, converstionCreate)
router.post('/messagesend/:id',userAuth, messageSend)
router.get('/converstionget/:id?',userAuth, converstionGet)
router.get('/messageget/:id',userAuth, messageGet)
// router.get("/*", function(req, res){res.status(300).send({url: req.originalUrl + ' not found'})});

module.exports = router;
