## koa2 笔记

koa2 中间件执行顺序

```javascript
app.use(async (ctx, next) => {
  console.log("中间件1")
  await next()
  console.log("回调1")
})

app.use(async (ctx, next) => {
  console.log("中间件2")
  await next()
  console.log("回调2")
})

// 顺序： 中间件1-中间件2-回调2-回调1
```
