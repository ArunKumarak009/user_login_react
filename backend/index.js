const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Create an instance of Express
const app = express();
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // Allow this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   }));
// Connection URL
const url = 'mongodb://localhost:27017'; // Change if necessary
const client = new MongoClient(url);


// Database Name
const dbName = 'mydatabase'; // Replace with your database name

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Express app!');
});


app.post('/add-user', async (req, res) => {
    
    console.log("Hello Backend")
    const { name  , email } = req.body
    console.log(req.body)
    if (!name) {
        return res.status(400).send('Name is required');
    }

    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users'); // Specify the collection name

        const result = await usersCollection.insertOne({ name , email});
        res.status(201).send({message:`User added with ID: ${result.insertedId}`});
    } catch (error) {
        console.error('Error inserting user', error);
        res.status(500).send('Error inserting user');
    } finally {
        await client.close();
    }
    
});


app.get('/myusers', async (req, res) => {
    
    console.log("Hello Backend2")
    
   
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users'); // Specify the collection name

        const users = await usersCollection.find({}).toArray(); 
        console.log(users) ;
        res.status(200).send(users);
    } catch (error) {
        console.error('Error inserting user', error);
        res.status(500).send('Error inserting user');
    } finally {
        await client.close();
    }
    
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
