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

app.get('/courses/:id', (req, res) => {
    const pid = req.params.id;
    const singleCourse = courses.find(course => course.id === pid);
    if (singleCourse) {
        res.send(singleCourse);
    }
    res.send({});
});


app.listen(port);