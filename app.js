// TODO Send view Pages
// TODO admin to login for posting
// TODO save project data to DB
// TODO Create a page for iframes

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
/////////////////////////////////////////////
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));


app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());

app.use(xss());

// Serving static files:
app.use(express.static(path.join(__dirname, 'public'))); // now we can access it in browser with only file name:

// Compressing our text responses
app.use(compression());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//############################################
//############################################ Routes
// Mounting router on a route by Using router as middleware
// when there is a request on /api/v1/tours/?....  it will enter this middleware in the middleware stack and then the
// tourRouter will kick in.

app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);


// ########################################### Invalid Routes
app.all('*', (req, res, next) => {

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ########################################## Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
