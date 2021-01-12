const { createLogger, format, transports, Logger } = require('winston');

// const levels = { 
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };
const level = process.env.LOG_LEVEL || 'debug';

//Formater
function formatParames(info) {
    const { timestamp, lavel, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ')

    return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, '') : ''}`
}

//Development Format
const devFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParames)
)

//Production Format
const prodFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(formatParames)            //configure letter
)

let logger = null;

if (process.env.NODE_ENV === 'production') {
    logger = createLogger({
        level,
        format: prodFormat,
        transports: [
            new transports.File({ filename: 'logs/error.log', level: 'error'}),
            new transports.File({ filename: 'logs/combined.log'})
        ]
    })
} else {
    logger = createLogger({
        level,
        format: devFormat,
        transports: [
            new transports.Console()
        ]
    })
}

module.exports = logger;