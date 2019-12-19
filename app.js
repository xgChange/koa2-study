const Koa = require("koa")
const Router = require("koa-router")
const views = require("koa-views")
const bodyParser = require("koa-bodyparser")
const static = require("koa-static")

const app = new Koa()
const router = new Router()
const PORT = 3000

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
)
app.use(bodyParser())
app.use(static(__dirname + "/static"))

app.use(async (ctx, next) => {
  // 无论app.use放在上面还是下面，都是在路由之前执行
  // ctx.body = "这是中间件"
  ctx.set("Content-Type", "application/json")
  await next()
  if (ctx.status === 404) {
    ctx.status = 404
    ctx.body = "这是一个404页面"
  } else {
    // console.log(ctx.url)
  }
})

router
  .get("/", async ctx => {
    // 获取get 传值
    /* 获取get传值  ctx.query,  ctx.queryString, ctx.request.url */
    await ctx.render("index", {
      name: "李四"
    })
  })
  .get("/newscontent/:newsId", async ctx => {
    // 动态路由, 如果有多个传值可以写成： /newsId/newsId2  匹配成: {newsId: xx, newsId2: cc}
    // 获取动态路由的传参 ctx.params
    ctx.body = ctx.params
  })
  .post("/api/login", async ctx => {
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
  })

app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`服务已启动 http://localhost:${PORT}`)
})
