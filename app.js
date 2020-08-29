const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./Routes/auth')

mongoose.connect('mongodb://localhost:27017/creditLocker', {useNewUrlParser: true, useUnifiedTopology: true});
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
app.use(bodyParser.json());
app.use('/api/',authRoutes)

app.listen(5000,() => {
    console.log('connected')
})