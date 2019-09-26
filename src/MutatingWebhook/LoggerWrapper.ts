import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        everything_file: {
            type: 'file',
            filename: 'all-the-logs.log',
            layout: {
                type: 'basic'
            }
        },
        console: {
            type: 'stdout',
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: { appenders: ['everything', 'console'], level: 'debug' },
    }
});

export const logger = getLogger('default');