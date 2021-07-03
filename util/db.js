const fs = require('fs')
const dbPath = "./db.txt"
let db = {}

try {
  db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
} catch (error) { }

/**
 * 
 * @param {* 支付宝还是微信} 支付宝或微信 
 * @param {* 唯一id} 交易单号 
 * @param {* 时间} 时间 
 * @param {* 支付对象} 支付对象 
 * @param {* 商品} 商品 
 * @param {* 价格} 价格 
 * @param {* 备注} 备注 
 */
module.exports.dbAddOrder = (支付宝或微信, 交易单号, 时间, 支付对象, 商品, 价格, 备注) => {
  if (db[交易单号]) {
    console.log('已经存在了', db[交易单号].商品, db[交易单号].价格)
  }
  db[交易单号] = {
    支付宝或微信, 交易单号, 时间, 支付对象, 商品, 价格, 备注
  }
}

/**
 * 保存数据到本地
 */
module.exports.dbSave = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db));
}


/**
 * 获取数据
 */
module.exports.dbGet = () => {
  return db;
}

