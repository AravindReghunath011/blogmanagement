import mongoose from 'mongoose'


const uri = "mongodb://localhost:27017/backend"

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));