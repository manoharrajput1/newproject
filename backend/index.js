const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

mongoose.connect('mongodb+srv://jhalar:singh01@cluster0.pmgih.mongodb.net/lonks?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const User = require('./schema/userSchema')

app.get('/users', async (req, res) => {
    try {
        const data = await User.find()
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/users/search/:query', async (req, res) => {
    const query = req.params.query;
    console.log(query);
    try {
      const users = await User.find({ first_name: { $regex: new RegExp(query, 'i') }});
      console.log(users);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.post('/users/filter/', async (req, res) => {
    const filter = req.body.data
      try {
        const filterData = await User.find(filter)
        console.log(filterData);
        res.json(filterData)
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
