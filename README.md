## API Endpoints:

POST: /api/payment/charge

    Creates charge from a token created from the Stripe frontend component, currently takes a token and amount due. Returns charge object.

    Sample request JSON:{token:"string", amountDue:0}

---

POST: /api/payment/createCustomer

    Creates a customer based on provided email, returns customer object

    Sample JSON:{email:"string"}

---

POST: /api/payment/createCard

    Creates a saved card on a user from a card token created from the charge object.

    Sample JSON:{customerId:"string", cardToken:"string}

---

GET: /api/payment/getCustomer

    Retrieves customer by saved customerId.

    Sample JSON:{customerId:"string"}
