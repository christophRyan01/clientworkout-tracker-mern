const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const workouts = require('./routes/workouts');
const users = require('./routes/users');

// =====PORT
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { 
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


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});