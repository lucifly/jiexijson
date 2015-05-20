//var http = require('http');
//var url = require('url');
//var util = require('util');
//
//http.createServer(function(req, res){
//    res.writeHead(200, {'Content-Type': 'application/json'});
//    //res.end("sss");
//res.end(util.inspect(url.parse(req.url, true)));
//}).listen(3000);
//http://localhost:3000/user?name=w3c&email=w3c@w3cschool.cc
//{ protocol: null,
//  slashes: null,
//  auth: null,
//  host: null,
//  port: null,
//  hostname: null,
//  hash: null,
//  search: '?name=w3c&email=w3c@w3cschool.cc',
//  query: { name: 'w3c', email: 'w3c@w3cschool.cc' },
//  pathname: '/user',
//  path: '/user?name=w3c&email=w3c@w3cschool.cc',
//  href: '/user?name=w3c&email=w3c@w3cschool.cc' }

/**
 * nodejs-web-server-service-framer-doctor
 *    @Sir.N
 *    @NiuMeng
 *    @20-05-2015
 * V1.1
 */


var http = require('http');
var urllib = require('url');

var port = 3000;
//var data = {'name': 'jifeng', 'company': 'taobao'};

http.createServer(function(req, res){
  
  //得到相关请求参数
  var params = urllib.parse(req.url, true);
  //console.log(params);
  var to_where = "" ;
  to_where = params.query;
  
  console.log("real_ulr: "+to_where.reqtypr);
  var req_type = to_where.reqtypr;

  //判断请求类型,13使用包装后第三方请求,需转手,11使用本地服务,不需转手
  if(req_type == 13)
  {
      console.log("real_ulr: "+to_where.real_ulr);//real_ulr中存放真实请求地址
      console.log("coor    : "+to_where.coor);//其他请求相关数据
      var data = {'r_ulr' : (to_where.real_ulr +"&coor="+to_where.coor)};
      /**此处还需加入转手相关代码 */
      if (params.query && params.query.callback) {
        //console.log(params.query.callback);
        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
        res.end(str);
      } else {
        res.end(JSON.stringify(data));//普通的json
      }     
  }
  
  
}).listen(port, function(){
  console.log('server is listening on port ' + port);  
});