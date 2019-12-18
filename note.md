# koa2 笔记

## koa2 中间件执行顺序

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

## ejs 模板引擎的使用

```javascript
/*
  1. npm i koa-views
  2. npm i ejs
  3. app.use(views(__dirname, { extension: 'ejs' }))
  4. await ctx.render('user.pug')
*/

app.use(
  views("views", {
    // 这种方式使用的话，后缀名是html。将html映射为ejs
    map: {
      html: "ejs"
    }
  })
)
```
