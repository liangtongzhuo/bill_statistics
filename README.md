# 前言
毕业以来一直有统计账单的习惯，最开始用「会记账」App 并且一直更新到微博 https://weibo.com/u/2038777590 ，目前 App 已经停止运行了，后来也因为原因也就没再统计。
![会记账App页面](http://file.liangtongzhuo.com/hOQGfKf8XjnVsFPJW8aAM8GzD3P8k15k/798546f6ly1galj9e3nosj20v9384tgz.jpeg)
一直想用一个账单软件，从支付宝和微信账单拉取信息统计，又怕第三方的不太安全。索性自己就写了一个，GitHub 地址：https://github.com/liangtongzhuo/bill_statistics

# 目录
- 1. 数据来源
- 2. 数据读取
- 3. 数据汇总保存
- 4. 数据页面保存
- 5. 项目 GitHub 地址

## 1. 数据来源
微信数据：我-支付-钱包-账单-常见问题-下载账单-输入到邮箱即可
微信账单如图：
![](http://file.liangtongzhuo.com/BK151yuBuvWhXhAG44BqK9NNeMlSxpaa/1627831235949.jpg)

支付宝数据：打开Web页面登录-交易记录-选择时间-下载excel
![](http://file.liangtongzhuo.com/8AJ62X2HW3zmmLwYrf7NskWrwu2Jvd2q/1627831444935.jpg)

## 2. 数据读取
```
const csv = require('csv-parser')
const fs = require('fs')


/**
 * csv 解析封装
 * @param {*} path csv路径
 */
module.exports.readcsv = (path) => {
  return new Promise((resolve, rejects) => {
    const results = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results)
      }).on('error', (error) => {
        rejects(error)
      })
  })
}

```

## 3. 数据汇总保存
JSON 格式保存本地
```
/**
 * 保存数据到本地
 */
module.exports.dbSave = (name) => {
  fs.writeFileSync(`${dbPath}_${name}`, JSON.stringify(db));
}
```

## 4. 数据页面保存
根据数据生成HTML静态页面
![](http://file.liangtongzhuo.com/kB6pRfa3ulM1VEso3wHyNzQmMYj9oej2/1627831695208.jpg)

## 5. 项目地址
https://github.com/liangtongzhuo/bill_statistics

### 文件目录
- db：存放从微信和支付宝账单读取账单的文件
- in_html: 默认模版，可用浏览器打开
- order：原始支付宝和微信账单位置
- statistics：根据数据生成 HTML 的逻辑
- out_html：根据数据生成后的HTML，可用浏览器打开
- util：工具
- index：执行入口
- config：配置文件，统计分类


```
npm i
node index #生成数据
node ./statistics/statistics_month.js #生成Web页面
```