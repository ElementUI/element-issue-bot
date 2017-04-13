const request = require('koa-request')

exports.commentIssue = options => {
  const response = request.post(options)
  return new Promise((resolve, reject) => {
    response((error, response) => {
      if (!error && response.statusCode === 201) {
        resolve()
      } else {
        reject(response)
      }
    })
  })
}

exports.closeIssue = options => {
  const response = request.patch(options)
  return new Promise((resolve, reject) => {
    response((error, response) => {
      if (!error && response.statusCode === 200) {
        resolve()
      } else {
        reject(response)
      }
    })
  })
}
