'use strict';

const service = require('../server/service');
const slackClient = require('../server/slackClient');
const http = require('http');
const server = http.createServer(service);

const slackToken = 'xoxb-233342902887-UDO4K6jTmqdXgHBRzmM2DP35';
const logLevel = 'verbose';

const rtm = slackClient.init(slackToken, logLevel);
rtm.start();


slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`Iris is listening on ${server.address().port} in ${service.get('env')} mode.`);
});