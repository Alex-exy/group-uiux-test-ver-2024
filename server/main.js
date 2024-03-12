const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Enable All CORS Requests

const port = 4000; // or any port you prefer

// MongoDB URI - updated to use the correct port 27027
const mongoURI = 'mongodb://localhost:27027/RideManager';

// Create a new MongoClient
const client = new MongoClient(mongoURI);

async function main() {
    app.use(bodyParser.json());
        app.post('/ridesDummy', async (req, res) => {
            //try {
                res.send('[{"_id":"65ea0ba4931607b3f3bade73","id":1,"type":"Car","distance":"10km","battery":"80%","info":"Electric","status":"Free"},{"_id":"65ea0ba4931607b3f3bade74","id":2,"type":"Bike","distance":"5km","battery":"60%","info":"Electric, Foldable","status":"Free"},{"_id":"65ea0ba4931607b3f3bade75","id":3,"type":"Scooter","distance":"3km","battery":"90%","info":"Electric","status":"Free"},{"_id":"65ea0e57931607b3f3bade76","id":1,"booker":"Alice Smith","destination":"Central Park","vehicleType":"Electric Car","battery":"85%","distanceToVehicle":"2km","departureTime":"14:00","status":"Share"},{"_id":"65ea0e57931607b3f3bade77","id":2,"booker":"Bob Johnson","destination":"Downtown","vehicleType":"Electric Scooter","battery":"70%","distanceToVehicle":"500m","departureTime":"15:30","status":"Share"}]');
            //} catch (err) {
                //res.status(500).json({ error: 'An error occurred while fetching rides', details: err });
            //}
        });
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to MongoDB");

    } catch (err) {
        console.error(err);
        process.exit(1); // Exit the process in case of initial connection failure
    }
        // Endpoint to get all Rides
        //app.post('/rides', async (req, res) => {
            //try {
                //const rides = await ridesCollection.find({}).toArray();
                //res.json(rides);
            //} catch (err) {
                //res.status(500).json({ error: 'An error occurred while fetching rides', details: err });
            //}
        //});
    app.post('/getPreviousRides', async (req, res) => {
    try {
        const db = client.db('RideManager');
        const ridesCollection = db.collection('rides');

        console.log(req);
        const userId = req.body.id;
    
        const rides = await db.collection('previousRides').find({userId:userId}).toArray();

        client.close();

        res.json({ success: true, rides });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve previous rides' });
    }
});


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

