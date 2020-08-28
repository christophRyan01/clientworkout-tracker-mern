const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();

const workouts = require('./routes/workouts');
const users = require('./routes/users');

// =====PORT
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


const connectionString = 'mongodb://localhost/client_tracker'
const url = process.env.MONGODB_URI;
mongoose.connect(url || connectionString, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/workouts', workouts);
app.use('/users', users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client-tracker/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-tracker', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});