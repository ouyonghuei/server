var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

var arrs = "";
var titleArr =new Array()


/* 术核电台 */
router.get('/', function (req, res, next) {
  for (var i = 1; i < 10; i++) {
    request('https://www.g-cores.com/categories/9/originals?page=' + i, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //返回的body为抓到的网页的html内容
        var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
        let titletext = $('.showcase');
        titletext.each(function (i, e) {
          let obj = {
            href: "",
            title: "",
            time:"",
            timedata:""
          }
          obj.title = $(e).find(".showcase_text a").text();
          obj.href = $(e).find(".showcase_text a").attr("href");
          let t = $(e).find(".showcase_time").text();
          let len = t.length;
          obj.time = t.substr(len-15,[10]);
          obj.timedata = time3 = Date.parse(obj.time);
          titleArr.push(obj);
          
        })
      }
    })
  }
  titleArr = titleArr.sort(compare('timedata'));
  res.render('index',
    {
      title: "机核电台",
      titleArr: titleArr
    }

  );
  titleArr.length = 0;
});
/* 机核文章 */
router.get('/g-text', function (req, res, next) {
  for (var i = 1; i < 20; i++) {
    request('https://www.g-cores.com/categories/1/originals?page=' + i, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //返回的body为抓到的网页的html内容
        var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
        let titletext = $('.showcase');
        titletext.each(function (i, e) {
          let obj = {
            href: "",
            title: "",
            time:"",
            timedata:""
          }
          obj.title = $(e).find(".showcase_text a").text();
          obj.href = $(e).find(".showcase_text a").attr("href");
          let t = $(e).find(".showcase_time").text();
          let len = t.length;
          obj.time = t.substr(len-15,[10]);
          obj.timedata = time3 = Date.parse(obj.time);
          titleArr.push(obj);
          
        })
      }
    })
  }
  titleArr = titleArr.sort(compare('timedata'));
  res.render('index',
    {
      title: "机核文章",
      titleArr: titleArr
    }

  );
  titleArr.length = 0;
});

router.get('/get', function (req, res, next) {
  request('http://www.cnblogs.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //返回的body为抓到的网页的html内容
      var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
      console.log(body)
      var navText = $('.post_nav_block').html(); //拿到导航栏的内容
      res.send(navText);
    }
  })
});

router.get('/json', function (req, res, next) {
  $ = require('cheerio');
  let json = {
    "a": "1",
    "b": "2"
  }
  res.json(json);
})

//排序配套
function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
  }
}
//搜索功能
function search(){
  console.log("ding")
}

module.exports = router;
