const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourroutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTERS
app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
