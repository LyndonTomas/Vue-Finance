const express = require ('express');
const mongodb = require ('mongodb');
require('dotenv/config');
const router = express.Router();

// Get Date
// Processing
router.get('/:date', async(req, res) =>{
    const orders = await loadOrders();
    const date = req.params.date;
    // const formatDate = (date) =>{
    //     return new Date(date).toLocaleDateString();
    // }
    res.json("date")
})

// Get All orders
// DONE
router.get('/', async (req, res) =>{
    const orders = await loadOrders();
    res.send(await orders.find({}).toArray());
});

//Delete an Order
// Done
router.delete('/:id', async(req,res) =>{
    const orders = await loadOrders();
    await orders.deleteOne({_id:req.params.id});
    res.status(200).send();
});

// Updating a Payment Status
// Done
router.patch('/:id/:value', async(req, res) =>{
    const orders = await loadOrders();
    const updatedDate = new Date();
    const update = await orders.updateOne(
        {_id:req.params.id}, 
        {
            $set:{
            payment_status:req.params.value, 
                "received_on": updatedDate}
            }
        );
        res.json(update);
        res.status(202).send();
})


// This is to connect to the MongoDB Atlas
// Done
async function loadOrders(){
    const client = await mongodb.MongoClient.connect(process.env.DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology:true
});
    console.log("\n\n Atlas Integration: Successful");
    return client.db('rest').collection('orders');
}

module.exports = router;