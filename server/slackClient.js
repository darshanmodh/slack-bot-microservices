'use strict';

const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

let rtm = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to channel.`);
};

function handleOnMessage(message) {
    rtm.sendMessage('This is just test message', message.channel, function messageSent() {
        // callback once the message has been sent.
    });
};

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(token, logLevel) {
    rtm = new RtmClient(token, {logLevel: logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
};

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;