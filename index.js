const express = require('express');
const cors = require('cors');

const courses = require('./data/courses.json');

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/courses', (req, res) => {
    res.send(courses);
});



app.listen(port);