const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
var corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  };
  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));


const config = require("./app/config/db.config");
mongoose.connect(config.url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false
    })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log(err);
    });


// Routes
app.use('/api/auth', require('./app/routes/authRoutes'));
app.use('/api/products', require('./app/routes/productRoutes'));
app.use('/api/cart', require('./app/routes/cartRoutes'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));