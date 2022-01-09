const express = require('express')
const router = express.Router();
const {getToken,proccessPayment} = require('../controllers/paymentB')

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.get('/payments/gettoken/:userId', isSignedIn, getToken)// I have remover isAuthenticated middleware for some error purpose.

router.post('/payment/braintree/:userId', isSignedIn, isAuthenticated, proccessPayment)

module.exports = router;