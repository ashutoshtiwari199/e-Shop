const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:   'd6h5y46jpk5t4cnv',
  publicKey:    'hzbss2d87hvdwgv4',
  privateKey:   '6d9d100da6b5c52b8996f60c6cc12770'
});


exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if(err){
            res.status(500).send(err)
        } else {
            res.send(response)
        }
      });
}

exports.proccessPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amoun

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json({error:err})
          } else {
              res.status(200).json(result)
          }
      });
}