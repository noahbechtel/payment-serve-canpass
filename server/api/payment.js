const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51Hunp9DchL2cGl0JQw105uqYbZztY8Xdga5yzjyfSljGPIe5ksNfLx2GLnOj9SY7kOY87U2qSVnP1gBSx3QmUs6N00FtU7mnCn'
)
module.exports = router

router.post('/charge', async (req, res, next) => {
  try {
    const {amountDue, token} = req.body
    const charge = await stripe.charges.create({
      amount: amountDue,
      currency: 'usd',
      description: `Test Charge`,
      source: token.id
    })
    res.json(charge)
  } catch (err) {
    next(err)
  }
})
router.post('/createCustomer', async (req, res, next) => {
  try {
    const {email} = req.body
    const customer = await stripe.customers.create({
      email
    })
    res.json(customer)
  } catch (err) {
    next(err)
  }
})
router.post('/createCard', async (req, res, next) => {
  try {
    const {customerId, cardToken} = req.body
    const card = await stripe.customers.createSource(customerId, {
      source: cardToken
    })
    res.json(card)
  } catch (err) {
    next(err)
  }
})

router.get('/getCustomer', async (req, res, next) => {
  try {
    const {customerId} = req.body
    const customer = await stripe.customers.retrieve(customerId)
    res.json(customer)
  } catch (err) {
    next(err)
  }
})
