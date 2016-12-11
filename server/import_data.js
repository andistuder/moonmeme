var jsonfile = require('jsonfile');
var pd = require('./../data/portrait_data.js');

var file = 'data/portrait_data.json';

jsonfile.writeFile(file, pd.all_people(), {spaces: 4}, function (err) {
  console.error(err)
})
