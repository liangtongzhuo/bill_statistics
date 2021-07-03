const csv = require('csv-parser')
const fs = require('fs')
const results = [];


fs.createReadStream('./order/7month/in_wechat.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });