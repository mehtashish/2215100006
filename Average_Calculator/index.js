const express = require('express');
const app = express();

const numbersRoute = require('./routes/numbers');
app.use('/numbers', numbersRoute);

app.listen(3000);