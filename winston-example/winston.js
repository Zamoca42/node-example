const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장

const { combine, timestamp, printf } = winston.format;
const logFormat = printf(({ timestamp, level, message }) => {return `${timestamp} ${level}: ${message}`});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true, // 압축여부
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error', // error.log 파일은 /logs/error 하위에 저장 
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
    exceptionHandlers: [
        // uncaughtException 발생시
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/exception', // exception.log 파일은 /logs/exception 하위에 저장 
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      )
    }));
}

module.exports = logger;
