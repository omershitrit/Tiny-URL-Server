const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;

var cors = require('cors')

app.use(cors())

const routes = require('./routes/api');


mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/api'));
app.use('/api', routes);

app.listen(process.env.PORT || PORT, console.log(`Server is starting at ${PORT}`));