/**
 * 读取csv缓存到本地文件
 */

const { readcsv, wechatBillSave, zfbtBillSave } = require('./util')
const { dbSave, dbAddOrder, clearDb } = require('./util/db')

async function main() {
  // 清空数据库
  clearDb()
  // 微信
  const wechatBillList = await readcsv('./order/7month/in_wechat.csv')
  await wechatBillSave(wechatBillList)
  // 支付宝
  const zfbBillList = await readcsv('./order/7month/in_zfb.csv')
  await zfbtBillSave(zfbBillList)
  // 当没有记录到支付宝和微信的第三方
  dbAddOrder('第三方', `2021/6/1 00:00`, `2021/6/15 00:00`, `美团`, '美团', '120', '')
  dbAddOrder('第三方', `2021/6/10 00:00`, `2021/6/10 00:00`, `省直公积金`, '额外补充的省直公积金', '1400', '')
  dbAddOrder('第三方', `2021/6/5 00:00`, `2021/6/5 00:00`, `银行借款`, '银行借款', '10000', '')
  dbAddOrder('第三方', `2021/6/11 00:00`, `2021/6/11 00:00`, `银行`, '额外利息', '150', '')
  dbAddOrder('第三方', `2021/6/15 00:00`, `2021/6/15 00:00`, `银行`, '房贷', '3000', '住房房贷')
  dbAddOrder('第三方', `2021/6/16 00:00`, `2021/6/16 00:00`, `京东`, '空调', '2000', '')
  dbAddOrder('第三方', `2021/6/28 00:00`, `2021/6/28 00:00`, `天然气验收`, '验收费', '600', '')

  // 数据缓存到本地数据库
  dbSave();
}



main();


