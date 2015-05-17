var fs = require('fs');

var mess='{     "info": {       "author": "meemoo",       "title": "Untitled",       "description": "Meemoo app description",       "parents": [],       "url": ""     },     "nodes": [       {         "id": 0,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/toshow.html",         "x": 736,         "y": 140,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 1,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/fengzhuangjiekou.html",         "x": 334,         "y": 169,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 2,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/sendnum.html",         "x": 100,         "y": 307,         "w": 200,                  "h": 210,         "state": {           "square": 11         }       }     ],     "edges": [       {         "source": [           2,           "squared"         ],         "target": [           1,           "input_t"         ]       },       {         "source": [           2,           "ready"         ],         "target": [           1,           "is_ready"         ]       },       {         "source": [           1,           "output_t"         ],         "target": [           0,           "square"         ]       }     ]   }'
var obj=JSON.parse(mess);

//console.log((obj.info).author);

var my_node = obj.nodes;
var my_edges = obj.edges;


var node_num = my_node.length;

var node_arry = new Array();//chun 节点信息
var edge_arry = new Array();//存邻接矩阵