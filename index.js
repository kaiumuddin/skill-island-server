const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();


// const courses = require('./data/courses.json');

// instance
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());




// Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rmad3ac.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run() {
    try {
        const videoCollection = client.db('skillIsland').collection('videos');
        const courseCollection = client.db('skillIsland').collection('courses');
        const enroledCourseCollection = client.db('skillIsland').collection('enroledCourses');

        app.post('/enrole', async (req, res) => {
            const newCourse = req.body;
            console.log(newCourse);
            const fromDb = await enroledCourseCollection.insertOne(newCourse);
            res.send(fromDb);
        });

        app.post('/addcourse', async (req, res) => {
            const newCourse = req.body;
            console.log(newCourse);
            const fromDb = await courseCollection.insertOne(newCourse);
            res.send(fromDb);
        });

        app.post('/videos', async (req, res) => {
            const newVideo = req.body;
            console.log(newVideo);
            const fromDb = await videoCollection.insertOne(newVideo);
            res.send(fromDb);
        });

        app.get('/mycourses/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const query = {email: email};
            const cursor = enroledCourseCollection.find(query);
            const enroledCourses = await cursor.toArray();
            console.log(enroledCourses);
            res.send(enroledCourses);
        });

        app.get('/courses', async (req, res) => {
            const query = {};
            const cursor = courseCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses);
        });

        app.get('/courses/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {_id: ObjectId(id)};
            const course = await courseCollection.findOne(query);
            console.log(course);
            res.send(course);
        });

        app.get('/courselessons/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {courseid: id};
            const cursor = videoCollection.find(query);
            const videos = await cursor.toArray();
            console.log(videos);
            res.send(videos);
        });

    }
    finally {

    }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Home Page');
});


app.listen(port, () => {
    console.log("running");
});