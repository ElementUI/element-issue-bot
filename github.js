const headers = require('./consts').headers
const md5 = require('md5')

const request = async (method, options) => {
  const response = require('koa-request')[method](options)
  return new Promise((resolve, reject) => {
    response((error, response) => {
      const code = response.statusCode
      if (!error && code >= 200 && code < 300) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

module.exports = {
  commentIssue(issue, comment) {
    const options = {
      url: `https://api.github.com/repos/elemefe/element/issues/${ issue.number }/comments`,
      headers,
      body: `{"body": "${ comment }"}`
    }
    return request('post', options)
  },

  translate: text => {
    const appid = '20180629000181417'
    const key = process.env.TRANSLATION_KEY
    const salt = Math.round(new Date().getTime() / 1000)
    const sign = md5(appid + text + salt + key)
    const options = {
      url: `http://api.fanyi.baidu.com/api/trans/vip/translate?from=zh&to=en&appid=${ appid }&salt=${ salt }&q=${ encodeURIComponent(text) }&sign=${ sign }`
    }
    return request('get', options)
  },
  
  closeIssue(issue) {
    const number = issue.number
    const options = {
      url: `https://api.github.com/repos/elemefe/element/issues/${ number }`,
      headers,
      body: '{"state": "closed"}'
    }
    return request('patch', options)
  },

  changeTitle(issue, title) {
    const number = issue.number
    const options = {
      url: `https://api.github.com/repos/elemefe/element/issues/${ number }`,
      headers,
      body: `{"title": "${ title }"}`
    }
    return request('patch', options)
  },

  addLabels(issue, labels) {
    const number = issue.number
    const options = {
      url: `https://api.github.com/repos/elemefe/element/issues/${ number }/labels`,
      headers,
      body: labels
    }
    return request('post', options)
  },

  addAssignees(issue, assignees) {
    const number = issue.number
    const options = {
      url: `https://api.github.com/repos/elemefe/element/issues/${ number }/assignees`,
      headers,
      body: `{"assignees": ${ assignees }}`
    }
    return request('post', options)
  }
}
