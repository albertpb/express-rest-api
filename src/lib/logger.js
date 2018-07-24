import chalk from 'chalk';
import winston from 'winston';
import path from 'path';

// set log as cli mode
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	);
}

function logServerConfig() {
	const url = ['http://', process.env.HOST, ':', process.env.PORT].join('');

	logger.info(chalk.red('=========================================='));
	logger.info(chalk.blue('Environment:') + ' ' + process.env.NODE_ENV);
	logger.info(chalk.blue('Listening at:') + ' ' + url);
	logger.info(chalk.blue('Directory:') + ' ' + path.resolve('src'));
	logger.info(chalk.red('=========================================='));
}

function colorfulLog(tokens, req, res) {
	let status = tokens.status(req, res);
	let statusColor =
		status >= 500
			? 'red'
			: status >= 400
				? 'yellow'
				: status >= 300
					? 'cyan'
					: 'green';

	let log =
		chalk.reset.white(
			padRight(tokens.method(req, res) + ' ' + tokens.url(req, res), 30),
		) +
		' ' +
		chalk[statusColor](status) +
		' ' +
		chalk.reset.blue(padLeft(tokens['response-time'](req, res) + ' ms', 8)) +
		' ' +
		chalk.reset('-') +
		' ' +
		chalk.reset.yellow(tokens.res(req, res, 'content-length') || '-');
	return log;
}

function padLeft(str, len) {
	return len > str.length
		? new Array(len - str.length + 1).join(' ') + str
		: str;
}
function padRight(str, len) {
	return len > str.length
		? str + new Array(len - str.length + 1).join(' ')
		: str;
}

export { logServerConfig, colorfulLog };
