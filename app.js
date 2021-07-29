const express    = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use('/public', express.static('public'));
const cors = require('cors');
const port = process.env.PORT;
const { handleError } = require('./helpers/error')
const adminRoutes = require('./routes/admin');
const whitelist = [process.env.ORIGIN, process.env.TEST_ORIGIN]
const corsOptionsDelegate = function (req, callback) {
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, methods : "PUT,PATCH,POST,DELETE" }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

global.__basedir = __dirname;
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', adminRoutes);

app.use((error, req, res, next) => {
    handleError(error, res);
})
app.listen(port, function(){
    console.log("server running on localhost:"+port);
});