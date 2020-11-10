const express = require ('express');
const mongodb = require ('mongodb');

require('dotenv/config')
const router = express.Router();

// Get Users
// No Purpose yet
// router.get('/', async (req, res) =>{
//     const orders = await loadUsers();
//     res.send(await orders.find({}).toArray());
// });

// Get only 1 user
// Used when loggin in
router.get('/:email/:password', async(req, res) =>{
    const users = await loadUsers();
    const result = await users.find({email:req.params.email, password:req.params.password}).toArray();
    if(result.length > 0){
        res.status(202).send()
    }else{
        res.status(201).send()
    }
})


// delete a user thru email
// For Demenstration only, not for production: 
// We don't want a felow average employee to delete someone's access
// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV 
// router.delete('/delete/:email', async(req,res) =>{
//     const users = await loadUsers();
//     await users.deleteOne({email:req.params.email});
//     console.log("User deleted")
//     res.status(200).send();
// });

// This is to connect to the MongoDB Atlas
async function loadUsers(){
    const client = await mongodb.MongoClient.connect(process.env.DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology:true
});
    console.log("\n\n Atlas Integration: Successful");
    return client.db('rest').collection('users');
}

module.exports = router;