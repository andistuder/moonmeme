var jsonfile = require('jsonfile');
const path = require('path');
var pd = require('./../data/portrait_data.js');

var file = path.join(__dirname, '../data/portrait_data.json');

jsonfile.writeFile(file, pd.all_people(), {spaces: 4}, function (err) {
  console.error(err)
})
