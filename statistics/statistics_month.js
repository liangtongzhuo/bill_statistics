const { dbGet } = require('../util/db')
const moment = require('moment')


async function main() {
  const db = dbGet()
  const orderDayList = []
  let totalPrice = 0
  for (let index = 0; index < 30; index++) {
    orderDayList[index] = 0
  }
  // 统计每个月当天花销
  for (const key in db) {
    const order = db[key]
    const day = moment(new Date(order['时间'])).format('D')-1
    const price = parseFloat(order['价格'])
    orderDayList[day] = orderDayList[day] + price
    totalPrice += price

    if (price > 100) {
      console.log('花销大于100的订单', order['时间'], order['支付对象'], order['商品'], order['价格']);
    }
  }
  console.log('7月总花销', totalPrice);
  console.log('每天', orderDayList);
}



main();


