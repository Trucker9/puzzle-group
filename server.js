const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env',
});

process.on('uncaughtException', (err) => {
    console.log(
        `
╔══════════════════════════════════════════════════════════╗
║          UNCAUGHT EXCEPTION! Shutting down ...           ║ 
╚══════════════════════════════════════════════════════════╝
`);
    console.error(err);
    process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DATABASE Connected successfully!');
    });


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port} ...`);
});


process.on('unhandledRejection', (err) => {
    console.log(
        `
╔══════════════════════════════════════════════════════════╗
║            UNHANDLED REJECTION! Shutting down            ║ 
╚══════════════════════════════════════════════════════════╝
`);
    console.error(err);
    server.close(() => process.exit(1));
});
