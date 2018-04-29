import chalk from 'chalk';
import log from 'winston';
import path from 'path';

// set log as cli mode
log.cli();

function logServerConfig() {
	const url = ['http://', process.env.HOST, ':', process.env.PORT].join('');

	log.info(chalk.red('=========================================='));
	log.info(chalk.blue('Environment:'), process.env.NODE_ENV);
	log.info(chalk.blue('Listening at:'), url);
	log.info(chalk.blue('Directory:'), path.resolve('src'));
	log.info(chalk.red('=========================================='));
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
