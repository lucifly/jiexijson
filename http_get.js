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
var http = require('http');
var urllib = require('url');

var port = 3000;
//var data = {'name': 'jifeng', 'company': 'taobao'};

http.createServer(function(req, res){
  var params = urllib.parse(req.url, true);
  //console.log(params);
  var to_where = "" ;
  to_where = params.query;
  console.log("real_ulr: "+to_where.reqtypr);
  var req_type = to_where.reqtypr;
  if(req_type == 13)
  {
      console.log("real_ulr: "+to_where.real_ulr);
      console.log("coor    : "+to_where.coor);
      var data = {'r_ulr' : (to_where.real_ulr +"&coor="+to_where.coor)};
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