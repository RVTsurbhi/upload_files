const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');

//import from inside modules
const dbConnection = require('./server/settings/dbSetting');
const errorHandler = require('./server/utils/errorHandler');
const routes = require('./server/routes/document');

const app = express()

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

//routes
app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('Hi there');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler)


app.listen(process.env.PORT || 3001, ()=>
    console.log(`Server is running on ${process.env.PORT}`)    
)