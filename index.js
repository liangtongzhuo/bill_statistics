/**
 * 读取csv缓存到本地文件
 */

const { readcsv, wechatBillSave, zfbtBillSave } = require('./util')
const { dbSave, dbAddOrder } = require('./util/db')

async function main() {
  // 微信
  const wechatBillList = await readcsv('./order/7month/in_wechat.csv')
  await wechatBillSave(wechatBillList)
  // 支付宝
  const zfbBillList = await readcsv('./order/7month/in_zfb.csv')
  await zfbtBillSave(zfbBillList)
  // 第三方
  dbAddOrder('第三方', `2021/6/1 00:00`, `2021/6/15 00:00`, `美团`, '美团', '120', '不记得买什么了')
  dbAddOrder('第三方', `2021/6/15 00:00`, `2021/6/15 00:00`, `银行`, '房贷', '3000', '住房房贷')
  dbAddOrder('第三方', `2021/6/16 00:00`, `2021/6/16 00:00`, `空调`, '空调', '2000', '不记得买什么了')

  // 数据缓存到本地数据库
  dbSave();
}



main();


