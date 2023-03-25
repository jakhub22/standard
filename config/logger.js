import moment from 'moment';
import path from 'path';
import winston from 'winston';
require('winston-daily-rotate-file');

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${moment(timestamp)
        .local()
        .format('YYYY-MM-DD HH:mm:ss')} ${level}: ${message}`;
});

let transport = new winston.transports.DailyRotateFile({
    filename: 'web-ep-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '200m',
    maxFiles: '30d',
    dirname: path.resolve(process.cwd(), '../logs'),
});

const logger = winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [transport],
});

export default logger;
