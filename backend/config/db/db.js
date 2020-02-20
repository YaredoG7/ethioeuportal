const mongoose = require('mongoose');
const pass = process.env.MONGO_PASS || 'HahuBetty123%23';
const dbURI = `mongodb+srv://hahuadmin:Yar24Yar@cluster0-x9jwh.mongodb.net/test?retryWrites=true&w=majority`;
// const dbURI = 'mongodb://localhost:27017/eteuportal'
const readLine = require('readline');

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false,  useUnifiedTopology: true }), 100);
}

mongoose.connection.on('connected', () => {
    console.log('connected');
});

mongoose.connection.on('error', err => {
    console.log('error: ' + err);
    return connect();
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
  });
  
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on ('SIGINT', () => {
      process.emit("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };
  
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0);
    });
  });
  process.on('SIGTERM', () => {
    gracefulShutdown('ViTelecom app shutdown', () => {
      process.exit(0);
    });
  });
  
  connect();
  require('../../authentication/model/user.model');
  require('../../app/eu-country/model/eu.country.model');
  require('../../authentication/model/documet.model');
  // module.exports = connect();
