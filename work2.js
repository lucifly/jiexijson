var fs = require('fs');

var mess='{     "info": {       "author": "meemoo",       "title": "Untitled",       "description": "Meemoo app description",       "parents": [],       "url": ""     },     "nodes": [       {         "id": 0,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/toshow.html",         "x": 736,         "y": 140,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 1,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/fengzhuangjiekou.html",         "x": 334,         "y": 169,         "w": 200,         "h": 210,         "state": {}       },       {         "id": 2,         "src": "file:///I:/nodejsstu/iframework-master/src/nodes/mytry/sendnum.html",         "x": 100,         "y": 307,         "w": 200,                  "h": 210,         "state": {           "square": 11         }       }     ],     "edges": [       {         "source": [           2,           "squared"         ],         "target": [           1,           "input_t"         ]       },       {         "source": [           2,           "ready"         ],         "target": [           1,           "is_ready"         ]       },       {         "source": [           1,           "output_t"         ],         "target": [           0,           "square"         ]       }     ]   }';
var obj=JSON.parse(mess);

//console.log((obj.info).author);

/*节点数组*/
var my_node = obj.nodes;
/******************************************************** *
[		
      {
			"id":
			"src": "file:///",
			"x": 736,
			"y": 140,
			"w": 200,
			"h": 210,
			"state": {}
      }
]
******************************************************** */ 
 
/*有向边数组*/
var my_edges = obj.edges;
 /******************************************************** *
[
		{
			"source": [
				2,       //输出节点编号
				"squared"//输出接口名
			],
			"target": [
				1,       //输入节点编号
				"input_t"//输入接口名
			]
		}
]
******************************************************** */
 
/*节点数量*/
var node_num = my_node.length;


/*节点信息数组*/
var node_arry = new Array();
/******************************************************** 
 node_arry[i].nodes.action string 响应函数
             .jiekou.out[] 输出接口名称数组
             .jiekou.in[]  输入接口名称数组
*///////////////////////////////////////////
/*/////////////////////////////////////////
{
  "info": {
    "author": "meemoo",
    "title": "Untitled",
    "description": "Meemoo app description",
    "parents": [],
    "url": ""
  },
  "nodes":
    {
      "action": "var tempt=I_arr[0];O_arr[0]=tempt;"
    },
  "jiekou": {
      "out": [
          "squared",
          "ready"
      ],
      "in": [
          "square",
          "reverse"
      ]
    }
}
******************************************************* */


/*节点邻接矩阵*/
var edge_arry = new Array();
/******************************************************** *
edge_arry[][]     0 0 1 0
                  1 0 0 0
                  0 0 0 1
   1->0->2->3     0 0 0 0
******************************************************** */


/*存节点输出情况*/
var node_io_arry = new Array();
/******************************************************** *
 node_io_arry[节点编号][节点输出接口编号][0] = 对应下一节点编号
 node_io_arry[节点编号][节点输出接口编号][1] = 对应输入接口编号
******************************************************** */


/*节点输入接口标记*/
var node_i_tar = new Array();
/******************************************************** *
 node_i_tar[节点编号][节点输出接口编号] = 0/1
******************************************************** */

var result_arr = new Array();//节点执行次序数组

var result_count = 0;

var i=0;
var j=0;
var temp_i = 0;
var temp_j = 0;

//初始化邻接矩阵
for(i=0; i<node_num; i++) 
{
    edge_arry[i] = new Array();
    for(j=0; j<node_num; j++)
    { edge_arry[i][j] = 0;}
}

//填节点信息数组
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

//初始化节点接数组
for(i=0; i<node_num; i++) 
{
    node_io_arry[i]=new Array();
    node_i_tar[i] = new Array();
    for(temp_i=0; temp_i<(((node_arry[i]).jiekou).out).length; temp_i++)
        {
            node_io_arry[i][temp_i]=new Array();
            node_io_arry[i][temp_i][0] = -1 ;
            node_io_arry[i][temp_i][1] = -1 ;
        }
    for(temp_i=0; temp_i<(((node_arry[i]).jiekou).in).length; temp_i++)
        {
            node_i_tar[i][temp_i]=0;
        }
}
// for(i=0; i<node_num; i++)
// {  
// console.log(((node_arry[i]).nodes).action);
// }

var edge_num = my_edges.length;//边的数量

//填节点接口数,邻接矩阵
for(i=0; i<edge_num; i++)
{
    var p_s = ((my_edges[i]).source)[0];//数据源节点
    var p_e = ((my_edges[i]).target)[0];//数据接收节点
    edge_arry[p_s][p_e] = 1;
    
    var p_s_name = ((my_edges[i]).source)[1];//数据源节点接口名
    var p_e_name = ((my_edges[i]).target)[1];//数据接收节点接口名
    
    var ll=(((node_arry[p_s]).jiekou).out).length;
    for(temp_i=0; temp_i<ll; temp_i++)
    {
        if( (((node_arry[p_s]).jiekou).out)[temp_i] == p_s_name )
            break;
    }
    //temp_i 数据源节点接口编号
    
    ll=(((node_arry[p_e]).jiekou).in).length;
    for(temp_j=0; temp_j<ll; temp_j++)
    {
        if( (((node_arry[p_e]).jiekou).in)[temp_j] == p_e_name )
            break;
    }
    //temp_j 数据接收节点接口编号
    
    // console.log(p_s + " " + temp_i + " " + temp_j);
    node_io_arry[p_s][temp_i][1] = temp_j;
    node_io_arry[p_s][temp_i][0] = p_e;
    
    node_i_tar[p_e][temp_j] = 1;
    // console.log(node_io_arry[p_s][temp_i] +"fffff");
}





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

for (i=0; i<result_arr.length; i++)
     console.log("qwewqr: "+result_arr[i]);

for(i=0; i<node_num; i++) 
{   
    console.log("aa: "+result_arr[i]);
    var aaaa = result_arr[i];
    for(temp_i=0; temp_i<(((node_arry[aaaa]).jiekou).out).length; temp_i++)
        {console.log(node_io_arry[aaaa][temp_i][0] + " "+ node_io_arry[aaaa][temp_i][1] + " ");}
}

// for (i=0; i<node_num; i++)
// for (j=0; j<(((node_arry[i]).jiekou).out).length; j++)
    // console.log(node_io_arry[i][j][0] + " "+ node_io_arry[i][j][1] + " ");


// console.log((my_f_json_obj.nodes).action);

// str.replace(/Microsoft/g, "W3School")
var write_to_file;
var node_action = new Array();//对应函数定义
var action_func = new Array();//对应函数应用

var somewords_I_arr = 'var I_arr = new Array();';
var somewords_O_arr = 'var O_arr = new Array();';
var var_idfi = ""; 

for(i=0; i<node_num; i++)
{  
    var replace_I_arr = "I_arr";
    replace_I_arr = replace_I_arr + "_" + i.toString() ;
    var replace_O_arr = "O_arr";
    replace_O_arr = replace_O_arr + "_" + i.toString() ;
    var tempppp = ((node_arry[i]).nodes).action;
    tempppp = tempppp.replace(/I_arr/g, replace_I_arr);
    tempppp = tempppp.replace(/O_arr/g, replace_O_arr);
    
    var temmmm ="var "+replace_I_arr+"=new Array();var "+replace_O_arr+"=new Array();";
    var_idfi = var_idfi + temmmm;
    tempppp = "     function do_action"+ "_" + i.toString() +"(" + replace_I_arr +","+ replace_O_arr +"){" + tempppp+ "};";
    action_func[i] = "do_action"+ "_" + i.toString() +"(" + replace_I_arr +","+ replace_O_arr +");";
    node_action[i] = tempppp;
    // console.log("aa:::"+node_action[i]);
}

    var tttttt = "";
    var t123 = "";
    var asdf = "";
    var out_p_count = 0;
    var tetetetet = "";
for (i=0; i<result_arr.length; i++)
{
    asdf = "";
    var tqwer = result_arr[i];
    tttttt = tttttt + node_action[tqwer] + "    ";
    
    
    for(temp_i=0; temp_i<(((node_arry[tqwer]).jiekou).out).length; temp_i++)
    {
        if((node_io_arry[tqwer][temp_i][1]) != -1)
            asdf = asdf + "I_arr_" + (node_io_arry[tqwer][temp_i][0] ).toString()+ "["+(node_io_arry[tqwer][temp_i][1]).toString() +"]" +" = O_arr" + "_" + tqwer.toString()+"["+temp_i+"];    ";
        else
        {
            tetetetet = tetetetet + "O_arr["+out_p_count+"] = "+"O_arr" + "_" + tqwer.toString()+"["+temp_i+"];    ";
            out_p_count = out_p_count + 1;
        }
    }
    // {console.log(node_io_arry[tqwer][temp_i][0] + " "+ node_io_arry[tqwer][temp_i][1] + " ");}
    
    t123 = t123 + action_func[tqwer]+ "    " + asdf +"    ";
    
}

var rererer = "";
var in_p_count = 0;
for(i=0;i<node_num;i++)
{
    for(temp_i=0; temp_i<(((node_arry[i]).jiekou).in).length; temp_i++)
    {
        if(node_i_tar[i][temp_i] == 0)
        {
            rererer = rererer + "I_arr_"+i+"["+ temp_i+"]" +"=" + "I_arr["+ in_p_count +"];    "; 
            in_p_count = in_p_count + 1;
        }
    }
}
var out_interface = "";
for(i=0;i<out_p_count;i++)
{
    out_interface = out_interface + "\"out_interface_"+ i+"\"";
    if(i != (out_p_count -1)) 
       out_interface +=", ";    
}

var in_interface = "";
for(i=0;i<in_p_count;i++)
{
    in_interface = in_interface + "\"in_interface_"+ i+"\"";
    if(i != (in_p_count -1)) 
       in_interface +=", ";    
}
write_to_file =var_idfi +"   "+rererer/*+ somewords_O_arr*/ + tttttt+ t123 + tetetetet;
//    console.log(write_to_file);
//    console.log(out_interface + "     adad     " + in_interface);
//    write_to_file = ""; 
    write_to_file = ' {\n'+
 ' "info": {\n'+
 '   "author": "meemoo",\n'+
 '   "title": "Untitled",\n'+
 '   "description": "Meemoo app description",\n'+
 '   "parents": [],\n'+
 '   "url": ""\n'+
 ' },\n'+
 ' "nodes":\n'+
 '   {\n'+
 '     "action": "'+write_to_file+'"\n'+
 '   },\n'+
 ' "jiekou": {\n'+
 '     "out": ['+ out_interface +
 '     ],\n'+
 '     "in": ['+ in_interface +
 '     ]\n'+
 '   }\n'+
'}\n';

    console.log(write_to_file);
 //写入文件
 fs.writeFile('I:/nodejsstu/iframework-master/src/nodes/mytry/tst.json', write_to_file, function (err) {
    if (err) throw err;
    console.log('It\'s saved!'); //文件被保存
});   
    
//













