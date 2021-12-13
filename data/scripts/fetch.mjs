import https from 'https'

const fetch = url =>
  new Promise((resolve, reject) => {
    https
      .request(url, response => {
        let str = ''

        response.on('data', function (chunk) {
          str += chunk
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error({ statusCode: response.statusCode }))
          }
        })

        response.on('end', function () {
          resolve(str)
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error({ statusCode: response.statusCode }))
          }
        })
      })
      .end()
  })

export default fetch
