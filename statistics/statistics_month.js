const { dbGet } = require('../util/db')
const { createHtml } = require('../util')
const config = require('../config')
const moment = require('moment')
const month = 7

// 生成统计页面
async function main() {
  
  const db = dbGet(month)
  // 统计月时间线
  const { totalPrice, orderDayList, max100TotalPrice } = await statisticsMonthTimeLine(db, month)
  // 统计月饼图
  const { treeArr, average } = await statisticsMonthBorderRadius(db)
  // 生成预览页面
  createHtml(totalPrice, max100TotalPrice, orderDayList, treeArr, average, month)
}

async function statisticsMonthBorderRadius(db) {
  const tree = config.tree
  const treePrice = config.treePrice

  for (const key in db) {
    const order = db[key]
    let bool = false
    for (const tag in tree) {
      const categoryArr = tree[tag]
      for (const category of categoryArr) {
        if (order['支付对象'].includes(category) || order['商品'].includes(category)) {
          bool = true
          treePrice[tag] += parseFloat(order['价格'])
        }
      }
    }
    if (!bool) treePrice['吃喝玩乐'] += parseFloat(order['价格'])
  }

  const treeArr = []
  let average = 0
  for (const key in treePrice) {
    if (treePrice[key] != 0) {
      treeArr.push({
        value: treePrice[key].toFixed(2), name: `${key}: ${treePrice[key].toFixed(2)}`,
      })
      if (key != '贷款和利息') {
        console.log(average, treePrice[key]);
        average += treePrice[key]
      }
    }
  }
  return {
    treeArr,average
  }
}

/**
 * 统计月的
 * @param {*} db 
 */
async function statisticsMonthTimeLine(db, month) {
  const orderDayList = []
  let totalPrice = 0
  let max100TotalPrice = 0
  const maxDay = getMonthDateDayCount(2021, month)
  for (let index = 0; index < maxDay; index++) {
    orderDayList[index] = 0
  }

  // 统计每个月当天花销相加
  for (const key in db) {
    const order = db[key]
    const day = moment(new Date(order['时间'])).format('D') - 1
    const price = parseFloat(order['价格'])
    // 当天花销增加
    orderDayList[day] = orderDayList[day] + price
    totalPrice += price
    if (price >= 100) {
      max100TotalPrice += parseFloat(order['价格'])
    }
    console.log(order['时间'], order['支付对象'], order['商品'], order['价格']);
  }
  console.log('----完成统计----');
  return {
    totalPrice, orderDayList, max100TotalPrice
  }
}


// 获取月份天数
function getMonthDateDayCount(year, month){
  var d = new Date(year, month, 0);
  return d.getDate();
}

main();


