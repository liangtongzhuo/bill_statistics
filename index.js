const { readcsv, wechatBillSave, zfbtBillSave, dbSave } = require('./util')
const { dbSave } = require('./util/db')

async function main() {
  // 微信
  const wechatBillList = await readcsv('./order/7month/in_wechat.csv')
  await wechatBillSave(wechatBillList)
  // 支付宝
  const zfbBillList = await readcsv('./order/7month/in_zfb.csv')
  await zfbtBillSave(zfbBillList)
  // 数据缓存到本地数据库
  dbSave();
}






main();


