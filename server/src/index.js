import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import productRoute from '../src/routes/product';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

app.use(bodyParser.json());
app.use(productRoute);
app.use(cors());


app.use((req,res,next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body);
  next()
});

//lokalt:
const server=process.env.NODE_ENV;
// const server = 'mongodb://it2810-46.idi.ntnu.no:27017/prosjekt4'

//Connect to the database(only done once)
//mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)
mongoose.connect(server, { useNewUrlParser: true } )


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.use(express.static('public'))


// Handler for 404 - Resource not found
app.use((req,res,next) => {
  res.status(404).send("We think you are lost!")
})

// Handler for 500
app.use((err,req,res,next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname,'../public/500.html'))
})
var PORT = 12000;

module.exports = app.listen(PORT, () => console.info(`Server has started on ${PORT}`));

//here
