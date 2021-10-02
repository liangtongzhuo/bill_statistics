/**
 * 读取csv缓存到本地文件
 */
const { readcsv, wechatBillSave, zfbtBillSave } = require('./util')
const { dbSave, dbAddOrder } = require('./util/db')
const { createPage } = require('./statistics/statistics_month')
const config = require('./config')
const month = config.month

// 保存数据到db
async function main() {
  // 读取微信
  const wechatBillList = await readcsv(`./order/${month}month/in_wechat.csv`)
  // 保存数据
  await wechatBillSave(wechatBillList)
  // 读取支付宝
  const zfbBillList = await readcsv(`./order/${month}month/in_zfb.csv`)
  // 保存数据
  await zfbtBillSave(zfbBillList)
  // 
  await funMonth(month)

  // 数据缓存到本地数据文件
  dbSave(month);

  // 页面生成
  createPage()
}

// 每个月没有记录到支付宝和微信的记录
async function funMonth(month) {
  // 预定 10000
  // 学费 91700
  // 认证材料 4800
  // 转专业 15200
  // 语言证明 2400

  if (month === 6) {
    dbAddOrder('第三方', `2021/${month}/1 12:34`, `2021/${month}/15 12:34`, `美团`, '美团', '120', '')
    dbAddOrder('第三方', `2021/${month}/10 12:34`, `2021/${month}/10 12:34`, `省直公积金`, '额外补充的省直公积金', '1400', '')
    dbAddOrder('第三方', `2021/${month}/11 12:34`, `2021/${month}/11 12:34`, `银行`, '额外利息', '150', '')
    dbAddOrder('第三方', `2021/${month}/15 12:34`, `2021/${month}/15 12:34`, `银行`, '房贷', '3000', '住房房贷')
    dbAddOrder('第三方', `2021/${month}/16 12:34`, `2021/${month}/16 12:34`, `京东`, '空调', '2000', '')
    dbAddOrder('第三方', `2021/${month}/28 12:34`, `2021/${month}/28 12:34`, `天然气验收`, '验收费', '600', '')
  } else if (month === 7) {
    dbAddOrder('第三方', `2021/${month}/1 12:34`, `2021/${month}/1 12:34`, `地铁`, '郑州地铁', '120', '')
    dbAddOrder('第三方', `2021/${month}/10 12:34`, `2021/${month}/10 12:34`, `省直公积金`, '额外补充的省直公积金', '400', '')
    dbAddOrder('第三方', `2021/${month}/15 12:34`, `2021/${month}/15 12:34`, `银行`, '房贷', '3000', '')
    dbAddOrder('第三方', `2021/${month}/21 12:34`, `2021/${month}/21 12:34`, `银行`, '额外利息', '225', '')
    dbAddOrder('第三方', `2021/${month}/27 12:34`, `2021/${month}/27 12:34`, `银行`, '额外还款', '8000', '')
  } else if (month === 8) {
    dbAddOrder('第三方', `2021/${month}/1 12:34`, `2021/${month}/1 12:34`, `地铁`, '郑州地铁', '120', '')
    dbAddOrder('第三方', `2021/${month}/2 12:34`, `2021/${month}/2 12:34`, `银行`, '房贷', '3000', '')
    dbAddOrder('第三方', `2021/${month}/3 12:34`, `2021/${month}/3 12:34`, `省直公积金`, '额外补充的省直公积金', '400', '')
    dbAddOrder('第三方', `2021/${month}/4 12:34`, `2021/${month}/4 12:34`, `美团`, '美团', '80', '')
    dbAddOrder('第三方', `2021/${month}/8 12:34`, `2021/${month}/8 12:34`, `银行`, '额外还款', '7000', '')
    dbAddOrder('第三方', `2021/${month}/21 12:34`, `2021/${month}/21 12:34`, `银行`, '额外利息', '585', '')
  } else if (month === 9) {
    dbAddOrder('第三方', `2021/${month}/8 12:34`, `2021/${month}/8 12:34`, `银行`, '额外还款', '6517', '一笔2005，一笔4512')
    dbAddOrder('第三方', `2021/${month}/11 12:34`, `2021/${month}/11 12:34`, `银行`, '额外还款', '2006', '')
    dbAddOrder('第三方', `2021/${month}/5 12:34`, `2021/${month}/5 12:34`, `银行`, '额外利息', '681', '')
  }
}


main();


