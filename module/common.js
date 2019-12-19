function getPostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ""
      ctx.req.on("data", chunk => {
        postData += chunk
      })

      ctx.req.on("end", () => {
        resolve(postData)
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { getPostData }
