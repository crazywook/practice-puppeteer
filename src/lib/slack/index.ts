const config = require('config')
const moment = require('moment')
const _ = require('lodash')
const IncomingWebhook = require('@slack/webhook').IncomingWebhook
const log4js = require('log4js')
const logger = log4js.getLogger()

const attachParams = {
  attachments: [
    {
      'fallback': '',
      'color': '#C49A6C',
      'pretext': '',
      'title': 'Fin2B Platform Link',
      'title_link': 'https://platform.fin2b.com/',
      'text': '',
      'fields': [
        {
          'title': 'Priority',
          'value': 'Medium',
          'short': false
        }
      ],
      'footer': 'Fin2B Alarm',
      'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png',
      'ts': moment().format('X')
    }
  ]
}

const slackParam = {
  text: `[${config.get('server.environment')}]Hello, Fin2b!`,
  username: 'fin2b-bot',
  iconEmoji: ':speak_no_evil:',
  //iconUrl: "",
  channel: config.get('slack.channel'),
  attachments: {}
}

const PRE_TEXT = {
  DISCOUNT_READY: '할인신청 준비 알림',
  DISCOUNT_DONE: '할인신청 완료 알림'
}

function sendToSlack(attachParams, cb) {
  //url 발급은 slack 에서 incoming & incoming webhooks 사용
  var url = 'https://hooks.slack.com/services/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'
  var webhook = new IncomingWebhook(url)
  //attachments는 message builder 사용하기 (https://api.slack.com/docs/messages/builder)
  
  logger.info('inside send to slack', _.assign(slackParam, attachParams))
  webhook.send(slackParam)
    .then(cb)
}

function sendDiscountReady(message, cb) {
  attachParams['attachments'][0] =_.assign(attachParams['attachments'][0], {pretext:PRE_TEXT.DISCOUNT_READY, text: message})
  sendToSlack(attachParams, cb)
}

function sendDiscountDone(message, cb) {
  attachParams['attachments'][0] =_.assign(attachParams['attachments'][0], {pretext:PRE_TEXT.DISCOUNT_READY, text: message})
  sendToSlack(attachParams, cb)
}

module.exports = {
  sendToSlack,
  sendDiscountReady,
  sendDiscountDone
}