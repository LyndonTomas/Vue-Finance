const axios = require('axios')
const express = require("express");
const mongodb = require("mongodb");
require("dotenv/config");
const router = express.Router();
const url = 'http://syntax-api-server.herokuapp.com/api/orders/';


// Get Date
// Processing
router.get("/:date", async (req, res) => {
  const queryDate = new Date(req.params.date);
  const year = queryDate.getFullYear();
  const month = queryDate.getMonth() + 1;
  const day = queryDate.getDate(); 
  axios.get(`${url}/${year}/${month}/${day}`)
  .then((response) => 
    res.status(response.status)
    .json(response.data))
  .catch(({response}) => 
    res.status(response.status)
    .json(response.data))
});

// Get All orders
// DONE
router.get("/", async (req, res) => {
  axios
    .get(url)
    .then((response) => res.status(response.status).json(response.data))
    .catch(({ response }) => res.status(response.status).json(response.data));
});

// Update Order_Status
// TODO
// router.delete("/:id/:value", async(req, res)=>{
//   axios.patch(`${url}${req.params.value}?id=${req.params.id}`)
//   .then((response) => {
//     res.status(response.status).json(response.data);
//     alert(response.data.msg)})
//   .catch(({ response }) => res.status(response.status).json(response.data));
// })

//Delete an Order
// Done
router.delete("/:id", async (req, res) => {
  axios.patch(`${url}delete?id=${req.params.id}`)
  .then((response) => {
    res.status(response.status).json(response.data);
    alert(response.data.msg)})
  .catch(({ response }) => res.status(response.status).json(response.data));
});

// Updating a Payment Status
// Done

router.patch("/:id/:value", async (req, res) => {
  axios.patch(`${url}payment/${req.params.value}?id=${req.params.id}`).
  then((response) => res.status(response.status).json(response.data))
  .catch(({ response }) => res.status(response.status).json(response.data));

  // const orders = await loadOrders();
  // const updatedDate = new Date();
  // const update = await orders.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       payment_status: req.params.value,
  //       paid_on: updatedDate,
  //     },
  //   }
  // );
  // res.json(update);
  // res.status(202).send();
});

// This is to connect to the MongoDB Atlas
// Done
async function loadOrders() {
  const client = await mongodb.MongoClient.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("\n\n Atlas Integration: Successful");
  return client.db("rest").collection("orders");
}

module.exports = router;
