const Koa = require("koa")
const Router = require("koa-router")

const app = new Koa()
const router = new Router()
const PORT = 3000

app.use(async (ctx, next) => {
  // 无论app.use放在上面还是下面，都是在路由之前执行
  // ctx.body = "这是中间件"
  await next()
  if (ctx.status === 404) {
    ctx.status = 404
    ctx.body = "这是一个404页面"
  } else {
    console.log(ctx.url)
  }
})

router
  .get("/", async ctx => {
    // 获取get 传值
    /* 获取get传值  ctx.query,  ctx.queryString, ctx.request.url */

    ctx.body = "这是首页"
    console.log("首页")
  })
  .get("/newscontent/:newsId", ctx => {
    // 动态路由, 如果有多个传值可以写成： /newsId/newsId2  匹配成: {newsId: xx, newsId2: cc}
    // 获取动态路由的传参 ctx.params
    console.log(ctx.params)
  })

app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`服务已启动 http://localhost:${PORT}`)
})
