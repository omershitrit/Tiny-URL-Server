const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');


mongoose.connect('mongodb+srv://Admin:<password>@cluster0.kmmqy.mongodb.net/users?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/', require('./routes/api'));
app.use('/api', routes);

app.listen(PORT || PORT, console.log(`Server is starting at ${PORT}`));
