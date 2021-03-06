const csv = require('csv-parser')
const fs = require('fs')
const { dbAddOrder } = require('./db')


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

/**
 * 微信账单保存
 * @param {微信账单} wechatBillList 
 */
module.exports.wechatBillSave = (wechatBillList) => {
  for (const order of wechatBillList) {
    const { 交易单号, 交易时间, 交易对方, 商品, 备注 } = order
    let 金额 = order['金额(元)']
    金额 = 金额.slice(1)
    // 目前只记录支出
    if (order['收/支'] == '支出') {
      // 添加
      dbAddOrder('微信', 交易单号, 交易时间, 交易对方, 商品, 金额, 备注)
    }
  }
}

/**
 * 支付宝账单保存
 * @param {微信账单} zfbBillList 
 */
module.exports.zfbtBillSave = (zfbBillList) => {
  for (const order of zfbBillList) {
    // 去除 key和 value 结尾带空格
    for (const key in order) {
      order[key] = order[key].trimEnd()
      order[key.trimEnd()] = order[key];
      if (key.trimEnd().length != key.length) {
        delete order[key]
      }
    }
    const { 交易号, 付款时间, 交易对方, 商品名称, 备注 } = order
    const 金额 = order['金额（元）']
    // 目前只记录支出
    if (order['收/支'] == '支出') {
      // 添加数据
      dbAddOrder('支付宝', 交易号, 付款时间, 交易对方, 商品名称, 金额, 备注)
    }
  }
}


module.exports.createHtml = (totalPrice, max100TotalPrice, orderDayList, treeArr, average, month) => {
  let html = fs.readFileSync(`./in_html/line-simple.html`, 'utf8');
  // 总量
  html = html.replace('梁同桌 00 月份总花费 10000¥', `梁同桌 ${month} 月份总花费 ${totalPrice.toFixed(2)}¥`);
  // 消费占比
  html = html.replace('96/100', `${(max100TotalPrice/totalPrice*100).toFixed(2)}%`);
  // 每天消费
  html = html.replace('1212', `${(totalPrice/31).toFixed(2)}`);
  // 除去贷款每天平均消费
  html = html.replace('1213', `${(average/31).toFixed(2)}`);
  // 曲线图数据
  html = html.replace('[1, 2, 3, 4, 5]', JSON.stringify(orderDayList));
  // 并行图
  html = html.replace(`[1, 2]`, JSON.stringify(treeArr));
  fs.writeFileSync(`./out_html/${month}month_line-simple.html`, html, 'utf8');
}

