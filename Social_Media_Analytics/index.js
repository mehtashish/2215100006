const express = require('express');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users')
const app = express();


app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);


app.listen(3000);