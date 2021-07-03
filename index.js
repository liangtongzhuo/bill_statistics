const { readcsv, avInit, saveOrderCloud } = require('./util')
const AV = avInit();

async function main() {
  // 微信
  const wechatBillList = await readcsv('./order/7month/in_wechat.csv')
  await wechatBillSaveCloud(wechatBillList)
  // 支付宝
  const zfbBillList = await readcsv('./order/7month/in_zfb.csv')
  await zfbtBillSaveCloud(zfbBillList)
}

/**
 * 微信账单保存
 * @param {微信账单} wechatBillList 
 */
async function wechatBillSaveCloud(wechatBillList) {
  for (const order of wechatBillList) {
    const { 交易单号, 交易时间, 交易对方, 商品, 备注 } = order
    let 金额 = order['金额(元)']
    金额 = 金额.slice(1)
    // 目前只记录支出
    if (order['收/支'] == '支出') {
      // 保存云端
      await saveOrderCloud('wechat', 交易单号, 交易时间, 交易对方, 商品, 金额, 备注, order)
    }
  }
}

/**
 * 支付宝账单保存
 * @param {微信账单} zfbBillList 
 */
async function zfbtBillSaveCloud(zfbBillList) {
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
      // 保存云端
      await saveOrderCloud('zfb', 交易号, 付款时间, 交易对方, 商品名称, 金额, 备注, order)
    }
  }
}




main();


