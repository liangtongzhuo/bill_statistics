const csv = require('csv-parser')
const fs = require('fs')
const dbPath = "./db.txt"
const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

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
module.exports.addOrderDB = async (wechat_or_zfb, uuid, time, target, commodity, price, notes, json) => {
  if (db[uuid]) {
    console.log('已经存在了', db[uuid].commodity, db[uuid].price)
  }
  db[uuid] = {
    wechat_or_zfb, uuid, time, target, commodity, price, notes, json
  }
}

/**
 * 保存数据到本地
 */
module.exports.dbSave = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db));
}




