import express from 'express'
import users from './routes/usersRoutes.js'
import blogs from './routes/blogRoutes.js'
import './db/db.js'

import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json())


app.use('/user',users)
app.use('/blog',blogs)



app.listen(8000,()=>{
    console.log('server is running on port 3000')
})