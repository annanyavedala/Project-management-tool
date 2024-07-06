const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

async function connect(){
    try{
      await mongoose.connect('mongodb+srv://svedala:1fia4ESeDoTylnJ2@clusterfirst.qhaglkt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFirst');
      console.log('MongoDB connected')
    }catch(err){console.error(err)}
  }

connect();
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/projectRoutes'));
app.use('/', require('./routes/taskRoutes'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








