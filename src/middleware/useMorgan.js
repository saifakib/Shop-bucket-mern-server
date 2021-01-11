const morgan = require('morgan')
const rfs = require("rotating-file-stream");
const path = require('path')

module.exports = function (app) {
    const format = typeof (process.env.NODE_ENV) === 'string' && process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

    // create a rotating write stream for error
    const accessLogStream400 = rfs.createStream('access400.log', {
        size: "20M", // rotate every 20 MegaBytes written
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../logs'),
    })

    // create a rotating write stream for without response error
    const accessLogStream200 = rfs.createStream('access200.log', {
        size: "20M", // rotate every 20 MegaBytes written
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../../logs'),
    })

    //Status code 400 & 500
    app.use(
        morgan(format, {
            skip: (req, res) => {
                return res.statusCode < 400;
            },
            stream: process.env.NODE_ENV === 'production' ? accessLogStream400 : process.stderr
        })
    );

    //Status code 200 & 300
    app.use(
        morgan(format, {
            skip: (req, res) => {
                return res.statusCode > 399;
            },
            stream: process.env.NODE_ENV === 'production' ? accessLogStream200 : process.stdout
        })
    )
};