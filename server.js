const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')



const AppError  = require('./utils/appError');
const glocalErrorHandler = require('./controllers/errorController')
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const db = require('./models/database');

dotenv.config({ path: './config.env' });
const app = express();

// middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); 



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/patient', patientRoutes)




app.all('*', (req,res,next)=>{
    next(new AppError(`Route is not defined yet,Cannot find ${req.originalUrl}`,404))
});

app.use(glocalErrorHandler)

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`App is listen on ${port}`)
})
