const Koa = require("koa")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const static = require("koa-static")
const render = require("koa-art-template")
const path = require("path")
const session = require("koa-session")

const app = new Koa()
const router = new Router()
const PORT = 3000

app.keys = ["some secret hurr"] // cookie的签名
const CONFIG = {
  key: "koa:sess",
  maxAge: 5000 /*cookie的过期时间 */,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false /*每次请求时强制设置cookie,重置cookie过期时间 */,
  renew: false
}

render(app, {
  // 配置art-template
  root: path.join(__dirname, "views"),
  extname: ".html",
  debug: process.env.NODE_ENV !== "production"
})

app.use(session(CONFIG, app))
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
    let msg = {
      name: "李四",
      html: "<h2>测试</h2>"
    }
    ctx.session.user = "ff"
    await ctx.render("user", {
      msg
    })
  })
  .get("/newscontent/:newsId", async ctx => {
    // 动态路由, 如果有多个传值可以写成： /newsId/newsId2  匹配成: {newsId: xx, newsId2: cc}
    // 获取动态路由的传参 ctx.params
    ctx.body = ctx.params
    console.log(ctx.session.user)
  })
  .post("/api/login", async ctx => {
    ctx.body = ctx.request.body
  })

app.use(router.routes()).use(router.allowedMethods())
app.listen(PORT, () => {
  console.log(`服务已启动 http://localhost:${PORT}`)
})
