var myarry = new Array();
myarry[0] =  new Array(0,1,0,0);
// myarry[1] =  new Array(0,0,1,1);
// myarry[2] =  new Array(0,0,0,1);
myarry[2] =  new Array(0,1,0,1);
myarry[1] =  new Array(0,0,0,1);
myarry[3] =  new Array(0,0,0,0);

//var funny = "hallo world";
//funny.replace();
//function good(params) {
//    {([])}
//}

var result_arr = new Array();
var result_count = 0;

var i=0;
var len=myarry.length;
var j=0;

// for (i=0; i<len; i++)
// for (j=0; j<len; j++)
    // console.log(myarry[i][j] + " ");

for (i=0; i<len; i++)
{
    for (j=0;j<len;j++) if(myarry[j][i] != 0 ) break;
   
    // console.log(j + " " + len);
    if(j == (len ) ) 
    {
        result_arr[result_count] = i;
        result_count += 1 ;
        myarry[i][i] = 1;
        for (var k=0;k<len;k++)
        {if(k!= i) myarry[i][k] = 0 ;}
        i=0;
    }
    
}

 // for (i=0; i<result_arr.length; i++)
     // console.log(result_arr[i]);

