const AV = require('leancloud-storage');
const csv = require('csv-parser')
const fs = require('fs')
const config = require('./config')
const Order = AV.Object.extend('Order');

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
 * leanCloud 存储初始化
 */
module.exports.avInit = () => {
  return AV.init({
    appId: config.appId,
    appKey: config.appKey,
    serverURL: config.serverURL
  });
}
/**
 * 
 * @param {* 支付宝还是微信} wechat_or_zfb 
 * @param {* 唯一id} uuid 
 * @param {* 时间} time 
 * @param {* 支付对象} target 
 * @param {* 商品} commodity 
 * @param {* 价格} price 
 * @param {* 备注} notes 
 * @param {* 存储原始数据} json 
 */
module.exports.saveOrderCloud = async (wechat_or_zfb, uuid, time, target, commodity, price, notes, json) => {
  const queryOrder = new AV.Query('Order');
  queryOrder.equalTo('uuid', uuid);
  const result = await queryOrder.first()
  if (result) {
    console.log('已经存在了', result.get('uuid'), result.get('commodity'), result.get('price'));
  } else {
    const order = new Order()
    order.set('wechat_or_zfb', wechat_or_zfb);
    order.set('uuid', uuid);
    order.set('time', new Date(time));
    order.set('target', target);
    order.set('commodity', commodity);
    order.set('price', price);
    order.set('notes', notes);
    order.set('json', JSON.stringify(json));
    await order.save()
    console.log(order.get('uuid'), order.get('commodity'), order.get('price'));
  }
}



