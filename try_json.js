var fs = require('fs');
var txt = "���ϳ���ʹ��fs.readFileSync��Դ·����ȡ�ļ����ݣ���ʹ��fs.writeFileSync���ļ�����д��Ŀ��·����";


var mess='{     "info": {       "author": "meemoo",       "title": "Untitled",       "description": "Meemoo app description",       "parents": [],       "url": ""     },     "nodes": [       {         "id": 0,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/toshow.html",         "x": 736,         "y": 140,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 1,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/fengzhuangjiekou.html",         "x": 334,         "y": 169,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 2,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/sendnum.html",         "x": 100,         "y": 307,         "w": 200,                  "h": 210,         "state": {           "square": 11         }       }     ],     "edges": [       {         "source": [           2,           "squared"         ],         "target": [           1,           "input_t"         ]       },       {         "source": [           2,           "ready"         ],         "target": [           1,           "is_ready"         ]       },       {         "source": [           1,           "output_t"         ],         "target": [           0,           "square"         ]       }     ]   }'
var obj=JSON.parse(mess);

//console.log((obj.info).author);

var my_node = obj.nodes;

 // for (i=0; i<my_node.length; i++)
 // {     
     // console.log((my_node[i]).id);
     // console.log((my_node[i]).src);
 // }
 

//д���ļ�
/* fs.writeFile('message.txt', txt, function (err) {
    if (err) throw err;
    console.log('It\'s saved!'); //�ļ�������
});
 */
//��ȡ�ļ�

var file_path = (((my_node[0]).src)) ;
//file_path = "\""+ file_path + "\"";
console.log("aaaa :  "+file_path);
var t1 = file_path.indexOf('I:/') ;
var t2 = file_path.substr(t1);
//file:///I:/nodejsstu/iframework-master/src/nodes/mytry/toshow.html
// // // // var str="Hello world!"
// // // // console.log(file_path.indexOf("Hello") + "<br />");

fs.readFile( t2, 'utf8', function (err, data) {
    if (err) throw err;
    console.log(data);
});
 
 