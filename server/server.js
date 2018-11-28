// Import Files
require('./config/config');

// Packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// Pase Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(require('./routes/user'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw err;
    console.log('DB ONLINE');
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});