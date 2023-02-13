const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');

const PORT = 8080;

const { notesRouter } = require('./router/notesRouter');
const { usersRouter } = require('./router/usersRouter');
const { infoRouter } = require('./router/infoRouter');
mongoose.connect('mongodb+srv://admin:admin321@cluster0.q2bc3la.mongodb.net/test?retryWrites=true&w=majority')
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/', usersRouter);
app.use('/users', infoRouter);
app.use('/notes', notesRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servr run ${PORT}`);
    });
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).send({ message: 'Server error' });
}
