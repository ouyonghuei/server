var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get', function(req, res, next) {
  request('http://www.cnblogs.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //返回的body为抓到的网页的html内容
      var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
      console.log(body)
      var navText=$('.post_nav_block').html(); //拿到导航栏的内容
      res.send(navText);
    }
  })
});

module.exports = router;
