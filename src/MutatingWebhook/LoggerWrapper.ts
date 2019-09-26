import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'all-the-logs.log',
            layout: {
                type: 'coloured'
            }
        },
        console: {
            type: 'stdout',
            layout: {
                type: 'coloured'
            }
        }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'debug' },
    }
});

export const logger = getLogger('default');