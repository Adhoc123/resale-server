const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jutqjot.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const categoryCollection = client.db("resale").collection("category");
      const microbusCollection = client.db("resale").collection("microbus");
      const luxurycarCollection = client.db("resale").collection("luxurycar");
      const electriccarCollection = client.db("resale").collection("electriccar");
      const bookingsCollection = client.db("resale").collection("bookings");
      const usersCollection = client.db("resale").collection("users");

      app.get('/category', async(req, res)=>{
           const query = {};
           const categories = await categoryCollection.find(query).toArray();
           res.send(categories);
      })
      app.get('/microbus', async(req, res)=>{
           const query = {};
           const microbus = await microbusCollection.find(query).toArray();
           res.send(microbus);
      })
      app.get('/luxurycar', async(req, res)=>{
           const query = {};
           const luxurycar = await luxurycarCollection.find(query).toArray();
           res.send(luxurycar);
      })
      app.get('/electriccar', async(req, res)=>{
           const query = {};
           const electriccar = await electriccarCollection.find(query).toArray();
           res.send(electriccar);
      })
      
      app.post('/bookings', async(req, res)=>{
          const booking = req.body;
          const result = await bookingsCollection.insertOne(booking);
          res.send(result);
      })
      app.post('/users', async(req, res)=>{
          const user = req.body;
          const result = await usersCollection.insertOne(user);
          res.send(result);
      })
      app.get('/users', async(req, res)=>{
          const query = {};
          const users = await usersCollection.find(query).toArray();
          res.send(users);
      })
      app.get('/bookings', async(req, res)=>{
          const email = req.body.email;
          console.log(email)
          const query = {email : email};
          const bookings = await bookingsCollection.find(query).toArray();
          console.log(bookings)
          res.send(bookings);
      })
      app.put('/users/admin/:id', async(req, res)=>{
          const id = req.params.id;
          const filter = { _id: ObjectId(id) };
          const options = {upsert: true};
          const updatedDoc = {
            $set:{
                role: 'admin'
            }
          }
          const result = await usersCollection.updateOne(filter, updatedDoc, options);
          res.send(result);
      })
    
    }
    finally {
      
    }
  }
run().catch(console.dir);


app.get('/', async(req, res)=>{
    res.send('resale is running');
})

app.listen(port, ()=> console.log(`Server is running on ${port}`))