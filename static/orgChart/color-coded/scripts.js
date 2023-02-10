'use strict';

(function($){

  $(function() {
    console.log('进入org_chart.html页面-----------------------------------')
    var datascource = {
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [
        { 'name': 'Bo Miao', 'title': 'department manager', 'className': 'middle-level',
          'children': [
            { 'name': 'Li Jing', 'title': 'senior engineer', 'className': 'product-dept' },
            { 'name': 'Li Xin', 'title': 'senior engineer', 'className': 'product-dept',
              'children': [
                { 'name': 'To To', 'title': 'engineer', 'className': 'pipeline1' },
                { 'name': 'Fei Fei', 'title': 'engineer', 'className': 'pipeline1' },
                { 'name': 'Xuan Xuan', 'title': 'engineer', 'className': 'pipeline1' }
              ]
            }
          ]
        },
        { 'name': 'Su Miao', 'title': 'department manager', 'className': 'middle-level',
          'children': [
            { 'name': 'Pang Pang', 'title': 'senior engineer', 'className': 'rd-dept' },
            { 'name': 'Hei Hei', 'title': 'senior engineer', 'className': 'rd-dept',
              'children': [
                { 'name': 'Xiang Xiang', 'title': 'UE engineer', 'className': 'frontend1' },
                { 'name': 'Dan Dan', 'title': 'engineer', 'className': 'frontend1' },
                { 'name': 'Zai Zai', 'title': 'engineer', 'className': 'frontend1' }
              ]
            }
          ]
        }
      ]
    };

    //$('#chart-container').orgchart({
    //  'data' : datascource,
    //  'nodeContent': 'title'
    //});

  });

})(jQuery);


var partObj = new Object();
var datasource = new Object();




function formatData(a, obj){
	if(Array.isArray(a)){
		for(var i=0; i<a.length; i++){
			var tmpObj = a[i];
			var partObj = new Object();
			if(!tmpObj["name"]){
				partObj["name"] = i;
				partObj["title"] = "";
				partObj["className"] = "rd-dept";
				partObj["children"] = new Array();
			}else{
				var name = tmpObj["name"];
				var className = "";
				var type = tmpObj["type"];
				var frequency = tmpObj["frequency"];
				var functionName = tmpObj["functionName"];
				if (tmpObj["type"]) {
					// 设置name的值
					if (type == "oneDimension" || type == "defaultOneDimension" || type == "twoDimension") {
						var index = name.lastIndexOf(".");
    				name = name.substring(index + 1, name.length);
					}
					// 设置name背景色
					if (type == "oneDimension") {
						className = "pipeline1";
					} else if (type == "defaultOneDimension") {
						className = "product-dept";
					} else if (type == "twoDimension") {
						className = "middle-level";
					} else {
						console.log("默认背景色");
					}
					type = "type：" + type;
				} else {
					type = "type：暂无";
				}
				if (frequency) {
					let fren = frequency.slice(2,5);
					frequency = "frequency：" + fren;
				} else {
					frequency = "frequency：暂无";
				}
				if (functionName) {
					functionName = "function：" + functionName;
				} else {
					functionName = "function：暂无";
				}

				partObj["name"] = name;
				partObj["title"] = type + "<br>" + frequency + "<br>" + functionName;
				partObj["className"] = className;
				partObj["children"] = new Array();
			}
			
			obj.push(partObj);
			
			var scripts = tmpObj["scripts"];
			if(scripts){				
				formatData(scripts, partObj["children"]);
			}
			
			var script = tmpObj["script"];
			if(script){
				formatData(script, partObj["children"]);
			}
			
			var columns = tmpObj["columns"];
			if(columns){
				formatData(columns, partObj["children"]);
			}
		}
	}else{
		if(!a["name"]){
			for(var i in a){
				var tmpObj = a[i];
				var partObj = new Object();
				
				obj["name"] = i;
				obj["title"] = "";
				partObj["className"] = "pipeline1";
				obj["children"] = new Array();
				
				var scripts = tmpObj["scripts"];
				if(scripts){
					formatData(scripts, obj["children"]);
				}
				
				var script = tmpObj["script"];
				if(script){
					formatData(script, obj["children"]);
				}
				
				var columns = tmpObj["columns"];
				if(columns){
					formatData(columns, obj["children"]);
				}
			}
		}else{
			var partObj = new Object();
			
			partObj["name"] = a["name"];
			var type = a["type"];
			var frequency = a["frequency"];
			var functionName = a["functionName"];
			if (a["type"]) {
				type = "type：" + a["type"];
			} else {
				type = "type：暂无";
			}
			if (a["frequency"]) {
				let fren = a["frequency"].slice(2,5);
				frequency = "frequency：" + fren;
			} else {
				frequency = "frequency：暂无";
			}
			if (a["functionName"]) {
				functionName = "function：" + a["functionName"];
			} else {
				functionName = "function：暂无";
			}
			partObj["title"] = type + "<br>" + frequency + "<br>" + functionName;
			// partObj["title"] = a["type"] + "<br>" + a["frequency"] + "<br>"  + a["functionName"];
			partObj["className"] = "frontend1";
			partObj["children"] = new Array();
			
			obj.push(partObj);
			
			var scripts = a["scripts"];
			if(scripts){
				formatData(scripts, partObj["children"]);
			}
			
			var script = a["script"];
			if(script){
				formatData(script, partObj["children"]);
			}
			
			var columns = a["columns"];
			if(columns){
				formatData(columns, partObj["children"]);
			}
		}
	}
}

// var a = 
// {
// 	"407":{
// 			"scripts":[
// 					{
// 							"columns":[
// 									{
// 											"id":"52175d81caef4751889a82d474fbf3ef",
// 											"name":"TEST-FLIGHT_PHASE",
// 											"type":"global parameter",
// 											"frequency":"G:1",
// 											"functionName":"EqualsTo"
// 									},
// 									{
// 											"id":"855969e3a0ee41e4b3f756611a9e9191",
// 											"name":"TEST-LDGL",
// 											"type":"global parameter",
// 											"frequency":"F:4",
// 											"functionName":"EqualsTo"
// 									},
// 									{
// 											"id":"273d355a8ab74846a9e7a4c4fbbe2b06",
// 											"name":"TEST-LDGR",
// 											"type":"global parameter",
// 											"frequency":"F:4",
// 											"functionName":"EqualsTo"
// 									}
// 							],
// 							"id":"17368e51a5744ec980e65a6759ab0c2a",
// 							"name":"99d23358fe1a4215b64f056fbef9733b.触地时刻",
// 							"type":"defaultOneDimension"
// 					},
// 					{
// 							"scripts":[
// 									{
// 											"columns":[
// 													{
// 															"id":"52175d81caef4751889a82d474fbf3ef",
// 															"name":"TEST-FLIGHT_PHASE",
// 															"type":"global parameter",
// 															"frequency":"G:1",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"855969e3a0ee41e4b3f756611a9e9191",
// 															"name":"TEST-LDGL",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"273d355a8ab74846a9e7a4c4fbbe2b06",
// 															"name":"TEST-LDGR",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													}
// 											],
// 											"id":"17368e51a5744ec980e65a6759ab0c2a",
// 											"name":"99d23358fe1a4215b64f056fbef9733b.触地时刻",
// 											"type":"oneDimension"
// 									},
// 									{
// 											"columns":[
// 													{
// 															"id":"52175d81caef4751889a82d474fbf3ef",
// 															"name":"TEST-FLIGHT_PHASE",
// 															"type":"global parameter",
// 															"frequency":"G:1",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"855969e3a0ee41e4b3f756611a9e9191",
// 															"name":"TEST-LDGL",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"273d355a8ab74846a9e7a4c4fbbe2b06",
// 															"name":"TEST-LDGR",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													}
// 											],
// 											"id":"17368e51a5744ec980e65a6759ab0c2a",
// 											"name":"99d23358fe1a4215b64f056fbef9733b.触地时刻",
// 											"type":"twoDimension"
// 									}
// 							],
// 							"columns":[
// 									{
// 											"id":"680B943D821DBB6EE053342A14AC5526",
// 											"name":"HEAD_LIN",
// 											"type":"template",
// 											"frequency":"G:1",
// 											"functionName":"avg"
// 									}
// 							],
// 							"id":"ae2cd8c3845d4594b892b5d52191a884",
// 							"name":"99d23358fe1a4215b64f056fbef9733b.触地后5秒真航向平均值",
// 							"type":"twoDimension"
// 					},
// 					{
// 							"scripts":[
// 									{
// 											"columns":[
// 													{
// 															"id":"52175d81caef4751889a82d474fbf3ef",
// 															"name":"TEST-FLIGHT_PHASE",
// 															"type":"global parameter",
// 															"frequency":"G:1",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"855969e3a0ee41e4b3f756611a9e9191",
// 															"name":"TEST-LDGL",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"273d355a8ab74846a9e7a4c4fbbe2b06",
// 															"name":"TEST-LDGR",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													}
// 											],
// 											"id":"17368e51a5744ec980e65a6759ab0c2a",
// 											"name":"99d23358fe1a4215b64f056fbef9733b.触地时刻",
// 											"type":"twoDimension"
// 									},
// 									{
// 											"columns":[
// 													{
// 															"id":"52175d81caef4751889a82d474fbf3ef",
// 															"name":"TEST-FLIGHT_PHASE",
// 															"type":"global parameter",
// 															"frequency":"G:1",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"855969e3a0ee41e4b3f756611a9e9191",
// 															"name":"TEST-LDGL",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													},
// 													{
// 															"id":"273d355a8ab74846a9e7a4c4fbbe2b06",
// 															"name":"TEST-LDGR",
// 															"type":"global parameter",
// 															"frequency":"F:4",
// 															"functionName":"EqualsTo"
// 													}
// 											],
// 											"id":"17368e51a5744ec980e65a6759ab0c2a",
// 											"name":"99d23358fe1a4215b64f056fbef9733b.触地时刻",
// 											"type":"twoDimension"
// 									}
// 							],
// 							"columns":[
// 									{
// 											"id":"680B943D821DBB6EE053342A14AC5526",
// 											"name":"HEAD_LIN",
// 											"type":"template",
// 											"frequency":"G:1",
// 											"functionName":"avg"
// 									}
// 							],
// 							"id":"ae2cd8c3845d4594b892b5d52191a884",
// 							"name":"99d23358fe1a4215b64f056fbef9733b.触地后5秒真航向平均值",
// 							"type":"twoDimension"
// 					}
// 			],
// 			"columns":[
// 					{
// 							"id":"680B943D821DBB6EE053342A14AC5526",
// 							"name":"HEAD_LIN",
// 							"type":"template",
// 							"frequency":"G:1",
// 							"functionName":"GreaterThan"
// 					},
// 					{
// 							"id":"680B943D821DBB6EE053342A14AC5526",
// 							"name":"HEAD_LIN",
// 							"type":"template",
// 							"frequency":"G:1",
// 							"functionName":"MinorThan"
// 					},
// 					{
// 							"id":"a9a66f4573f5418aa65eded9e3d72edc",
// 							"name":"TEST-GSC",
// 							"type":"global parameter",
// 							"frequency":"G:1",
// 							"functionName":"first"
// 					}
// 			],
// 			"test_data":[
// 					{
// 							"id":"282429",
// 							"rowKey":"11022018B70310127",
// 							"value":"27.0"
// 					}
// 			]
// 	}
// };
// 主方法
function getInfo(data) {
    formatData(data, datasource);
    // formatData(a, datasource);
    console.log(datasource)
    $('#chart-container').orgchart({
        'data' : datasource,
        'nodeContent': 'title'
    });
}

function isEmptyObject(obj){
      for(var key in obj){
           return false
      };
      return true
 };


// formatData(a, datasource);

