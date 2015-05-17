var myarry = new Array();
myarry[0] =  new Array();
myarry[1] =  new Array();
myarry[2] =  new Array();
myarry[3] =  new Array();


var result_arr = new Array();
var result_count = 0;

var i=0;
var len=myarry.length;
var j=0;

for (i=0; i<len; i++)
{
    for (j=0;j<len;j++) if(myarry[j][i] != 0 ||myarry[j][j] == 1 ) break;
    
    if(j == (len + 1) ) 
    {
        result_arr[result_count] = i;
        result_count += 1 ;
        myarry[i][i] = 1;
        for (var k=0;k<len;k++)
        {if(k!= i) myarry[i][k] = 0 ;}
    }
    
}

for (i=0; i<result_arr.length; i++)
    console.log(result_arr[i]);