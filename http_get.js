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
var test = "" ;
var port = 3000;
//var data = {'name': 'jifeng', 'company': 'taobao'};

http.createServer(function(req, res){
  
  //得到相关请求参数
  var params = urllib.parse(req.url, true);
  //console.log(params);
  var to_where = "" ;
  to_where = params.query;
  
  console.log("real_type: "+to_where.reqtypr);
  var req_type = to_where.reqtypr;
var data;
  //判断请求类型,13使用包装后第三方请求,需转手,11使用本地服务,不需转手
  if(req_type == 13)
  {
      console.log("real_ulr: "+to_where.real_ulr);//real_ulr中存放真实请求地址
      var ture_ulr = to_where.real_ulr;
      if( ture_ulr == "http://api.map.baidu.com/location/ip?ak=wROHF9YIK6wRPbf4fY2tmkur" )
      {//百度地图iptoadd 
          //http://api.map.baidu.com/location/ip?ak=wROHF9YIK6wRPbf4fY2tmkur
          console.log("coor    : "+to_where.coor);//其他请求相关数据
          var t_coor = to_where.coor;
//          var data = {'r_ulr' : (to_where.real_ulr +"&coor="+to_where.coor)};
          
          
          /**此处还需加入转手相关代码 */
           http.get('http://api.map.baidu.com/location/ip?ak=wROHF9YIK6wRPbf4fY2tmkur&coor=bd09ll', function(res) {
            //  var obj='\''+res+'\'';
            //   var obj = JSON.parse(res); 
            res.setEncoding('utf8'); 
            res.on('data', function (chunk) {  
              var obj = JSON.parse(chunk); 
                    console.log("back address:"+ obj.address); 
                     test =obj.content ;
                });
            }).on('error', function(e) {
              console.log("Got error11: " );
            }); 
//           console.log("test : " + test.point);
            data  = test.point;
//           console.log("x:"+ result_obj);
//            if(!test) var resullt_t1 =JSON.parse(test); 
//                    console.log("back content:"+ resullt_t1.content); 
////            var resullt = (test.content).point;
//            var data ={'x_point' : resullt_t2.x ,"y_point" : resullt_t2.y};
           
           
      }
//      else if( ture_ulr == "http://api2.juheapi.com/park/query?ak=45fd7fdd2d047d923e17ab08efa68554")
      else
      {//聚合数据 add find parking
          //  var ulr= "http://api2.juheapi.com/park/query";
          //  var ak = "45fd7fdd2d047d923e17ab08efa68554";
          //  console.log("x:" + x_p.toString());
          //  console.log("y:" +y_p.toString());
          //  var oDis = document.getElementById('distance');
          //  console.log("distance:" + oDis.value);
          //  ulr = ulr + "?" + "key=" + ak + "&" + "lon=" + x_p + "&" + "lat=" + y_p + "&"+"distance="+oDis.value+"&limit=10";
//          var t_coor = to_where.coor;

           console.log("2");
           //http://api2.juheapi.com/park/query?key=45fd7fdd2d047d923e17ab08efa68554&lon=116.3635870000&lat=39.9663730000&distance=1000&limit=10
           http.get('http://api2.juheapi.com/park/query?key=45fd7fdd2d047d923e17ab08efa68554&lon=116.3654190000&lat=39.9700500000&distance=1000&limit=5', function(res) {
            //  var obj='\''+res+'\'';
            //   var obj = JSON.parse(res); 
            res.setEncoding('utf8'); 
            res.on('data', function (chunk) {  
              var obj = JSON.parse(chunk); 
                   // console.log("back address:"+ obj.address); 
//                 console.log( "ddd: " + (((obj.result))[0]).CCDZ  );
//           data = {'r2_ulr' : (to_where.real_ulr)};
                    console.log("back sussed.");
                    test= obj;
//                    console.log( "ddd: " + (((data.result))[0]).CCDZ  );

//             data ={'x_point' : 'aaa'};

                    // test =obj.content ;
                });
            }).on('error', function(e) {
              console.log("Got error11: " );
            });
             data  = test;
      }
      
      if (params.query && params.query.callback) {
//        //console.log(params.query.callback);
//        console.log( "ddd: " + (((data.result))[0]).CCDZ  );
        var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
        res.end(str);
      } else {
        res.end(JSON.stringify(data));//普通的json
      }     
  }
  
  
//  var ulr= "http://api2.juheapi.com/park/query";
//  var ak = "45fd7fdd2d047d923e17ab08efa68554";
//  console.log("x:" + x_p.toString());
//  console.log("y:" +y_p.toString());
//  var oDis = document.getElementById('distance');
//  console.log("distance:" + oDis.value);
//  ulr = ulr + "?" + "key=" + ak + "&" + "lon=" + x_p + "&" + "lat=" + y_p + "&"+"distance="+oDis.value+"&limit=10";

  
}).listen(port, function(){
  console.log('server is listening on port ' + port);  
});