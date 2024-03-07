const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable All CORS Requests

const port = 4000; // or any port you prefer

// MongoDB URI - updated to use the correct port 27027
const mongoURI = 'mongodb://localhost:27027/RideManager';

// Create a new MongoClient
const client = new MongoClient(mongoURI);

async function main() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db('RideManager');
        const ridesCollection = db.collection('rides');

        // Endpoint to get all Rides
        app.post('/rides', async (req, res) => {
            try {
                const rides = await ridesCollection.find({}).toArray();
                res.json(rides);
            } catch (err) {
                res.status(500).json({ error: 'An error occurred while fetching rides', details: err });
            }
        });

    } catch (err) {
        console.error(err);
        process.exit(1); // Exit the process in case of initial connection failure
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    main().catch(console.error);
});

// Properly handle close events
process.on('SIGINT', async () => {
    await client.close();
    process.exit(0);
});

