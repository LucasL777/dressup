const express = require('express');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./src/routes/auth.routes');
const clothesRoutes = require('./src/routes/clothes.routes');
const outfitsRoutes = require('./src/routes/outfits.routes');
const listsRoutes = require('./src/routes/lists.routes');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({
  secret: '5e4ddlq5pe56xh4qap33r2',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true }
}));

// Routes
app.use('/auth', authRoutes);
app.use('/clothes', clothesRoutes);
app.use('/outfits', outfitsRoutes);
app.use('/lists', listsRoutes);

module.exports = app;
