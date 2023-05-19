require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const session = require('express-session');
const cors = require('cors');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const pool = require('./server/database/connection');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: 'session',
    }),
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session:', req.session);
  next();
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

//user routes
const userRoutes = require('./server/api/userRoutes');

app.use('/api', userRoutes);



app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
