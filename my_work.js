var fs = require('fs');

var mess='{     "info": {       "author": "meemoo",       "title": "Untitled",       "description": "Meemoo app description",       "parents": [],       "url": ""     },     "nodes": [       {         "id": 0,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/toshow.html",         "x": 736,         "y": 140,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 1,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/fengzhuangjiekou.html",         "x": 334,         "y": 169,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 2,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/sendnum.html",         "x": 100,         "y": 307,         "w": 200,                  "h": 210,         "state": {           "square": 11         }       }     ],     "edges": [       {         "source": [           2,           "squared"         ],         "target": [           1,           "input_t"         ]       },       {         "source": [           2,           "ready"         ],         "target": [           1,           "is_ready"         ]       },       {         "source": [           1,           "output_t"         ],         "target": [           0,           "square"         ]       }     ]   }'
var obj=JSON.parse(mess);

//console.log((obj.info).author);

var my_node = obj.nodes;
var my_edges = obj.edges;


var node_num = my_node.length;

var node_arry = new Array();//chun 节点信息
var edge_arry = new Array();//存邻接矩阵
var node_io_arry = new Array();//存邻接矩阵
var result_arr = new Array();
var result_count = 0;

var i=0;
var j=0;
var temp_i = 0;
var temp_j = 0;

for(i=0; i<node_num; i++) 
{
    edge_arry[i] = new Array();
    for(j=0; j<node_num; j++)
    { edge_arry[i][j] = 0;}
}


for(i=0; i<node_num; i++)
{
    var file_path = (((my_node[i]).src)) ;
    
    var t1 = file_path.indexOf('I:/') ;
    var t2 = file_path.indexOf('.html') ;
    var t3 = file_path.substr(t1,t2- t1);
    
    var my_f_json = "a:";
    my_f_json = fs.readFileSync( t3+'.json', 'utf8', function (err, data ) {
        if (err) throw err;
    });

   node_arry[i]=JSON.parse(my_f_json);
}

for(i=0; i<node_num; i++) 
{
    node_io_arry[i]=new Array();
    for(temp_i=0; temp_i<(((node_arry[i]).jiekou).out).length; temp_i++)
        {
            node_io_arry[i][temp_i]=new Array();
            node_io_arry[i][temp_i][0] = -1 ;
            node_io_arry[i][temp_i][1] = -1 ;
        }
}
// for(i=0; i<node_num; i++)
// {  
// console.log(((node_arry[i]).nodes).action);
// }

var edge_num = my_edges.length;
for(i=0; i<edge_num; i++)
{
    var p_s = ((my_edges[i]).source)[0];
    var p_e = ((my_edges[i]).target)[0];
    edge_arry[p_s][p_e] = 1;
    
    var p_s_name = ((my_edges[i]).source)[1];
    var p_e_name = ((my_edges[i]).target)[1];
    
    var ll=(((node_arry[p_s]).jiekou).out).length;
    for(temp_i=0; temp_i<ll; temp_i++)
    {
        if( (((node_arry[p_s]).jiekou).out)[temp_i] == p_s_name )
            break;
    }
    //temp_i
    
    ll=(((node_arry[p_e]).jiekou).in).length;
    for(temp_j=0; temp_j<ll; temp_j++)
    {
        if( (((node_arry[p_e]).jiekou).in)[temp_j] == p_e_name )
            break;
    }
    //temp_j
    // console.log(p_s + " " + temp_i + " " + temp_j);
    node_io_arry[p_s][temp_i][1] = temp_j;
    node_io_arry[p_s][temp_i][0] = p_e;
    
    // console.log(node_io_arry[p_s][temp_i] +"fffff");
}


for (i=0; i<node_num; i++)
for (j=0; j<(((node_arry[i]).jiekou).out).length; j++)
    console.log(node_io_arry[i][j][0] + " "+ node_io_arry[i][j][1] + " ");


// for (i=0; i<node_num; i++)
// for (j=0; j<node_num; j++)
    // console.log(edge_arry[i][j] + " ");
result_count = 0;
for (i=0; i<node_num; i++)
{
    for (j=0;j<node_num;j++) if(edge_arry[j][i] != 0 ) break;
   
     // console.log(j + " " + i);
    if(j == (node_num) ) 
    {
        //console.log(i);
        result_arr[result_count] = i;
        result_count += 1 ;
        edge_arry[i][i] = 1;
        for (var k=0;k<node_num;k++)
        {if(k!= i) edge_arry[i][k] = 0 ;}
     // console.log(edge_arry[0][0] + "aaa: "+edge_arry[0][1] + "aaa: "+edge_arry[0][2] + "aaa: "+i);
     // console.log(edge_arry[1][0] + "aaa: "+edge_arry[1][1] + "aaa: "+edge_arry[1][2] + "aaa: "+i);
     // console.log(edge_arry[2][0] + "aaa: "+edge_arry[2][1] + "aaa: "+edge_arry[2][2] + "aaa: "+i);
        i=-1;
    }
    
}

 // for (i=0; i<result_arr.length; i++)
     // console.log(result_arr[i]);

// for(i=0; i<node_num; i++) 
// {   
    // console.log("aa: "+result_arr[i]);
    // var aaaa = result_arr[i];
    // for(temp_i=0; temp_i<(((node_arry[aaaa]).jiekou).out).length; temp_i++)
        // {console.log(node_io_arry[aaaa][temp_i]) ;}
// }
























