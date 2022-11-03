#! /usr/bin/env node

import { executable } from '../lib/executable';

const program = executable({
    name: 'confluence',
    groupId: 'com.atlassian.confluence',
    webappName: 'confluence-webapp',
    contextPath: '/confluence',
    httpPort: 1990,
    ajpPort: 8009,
    debugPort: 5005,
    plugins: []
});

program.version(require('../../package.json').version);
program.parse(process.argv);
