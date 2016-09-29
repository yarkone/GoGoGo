

//****************************cookie创建，有效期，获取，删除********************************************

//设置cookie
function setCookie(key,value,expires){
	var _value = key + "=" + value;
	if(expires){
		_value += ";expires=" + _getDate(expires);
	}
	document.cookie = _value;
}

//有效期时间
function _getDate(num){
	var d = new Date();
	d.setDate(d.getDate() + num);
	return d;
}

//获取指定key的value
function getCookie(key){
	var cookies = document.cookie.split("; ");//获取所有cookie
	for(var i = 0;i < cookies.length;i++){//获得单个cookie并分割键值对并返回值value;
		var cookie = cookies[i].split("=");
		if(cookie[0] == key){
			return cookie[1];
		}
	}
	return "";
}


//删除指定的cookie
function removeCookie(key){
	document.cookie = key + "=;expires=" + new Date(0);
}




//****************************Ajax********************************************

var utility = {
	Ajax:{
		send:function(method,url,async,successFn){
			var req = new XMLHttpRequest();
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200){
					//var n = req.responseText;
					//console.log(typeof successFn);  //function
					if(typeof successFn == "function"){
						//将服务器端的响应信息作为实参进行传递
						successFn(req.responseText);	
					}
				}
			};
			req.open(method,url,async);
			req.send(null);
		}
	}
};

//****************************元素样式获取********************************************

//获取指定元素obj的指定样式att
function getStyle(obj,att){
	if(obj.currentStyle){
		return obj.currentStyle[att];
	}else{
		return getComputedStyle(obj,null)[att];
	}
}



//****************************获取随机数********************************************

function change(n,min,max){//获取一组长度为N且不重复的随机数[min,max]，以数组的方式返回
	var arr=[];
	for(i=0;i<n;i++){
		//arr.push(parseInt(Math.random()*(max-min+1)+min));
		arr[i]=parseInt(Math.random()*(max-min+1)+min);
		for(j=0;j<i;j++){
			if(arr[i]==arr[j]){
				i=i-1;
				break;
			}
		}
	}
	return arr;
}

//****************************元素属性渐变和透明度渐变********************************************

var timer = null;

//元素属渐变和透明度渐变
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		for(var att in json){ //att表示json对象中属性的名称
			if(att == "opacity"){
				var _value = parseInt(getStyle(obj,att) * 100);//chrome浏览器取值为0.200000000008344，故*100
			}else{
				var _value = parseInt(getStyle(obj,att));
			}
			
			/*
				计算速度
				json[att]获取的是json中属性对应的值  0
			*/
			
			var speed = (json[att] - _value) / 3;  
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(_value == json[att]){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}else{
				if(att == "opacity"){//透明度渐变
					obj.style[att] = (_value + speed) / 100;
					obj.style.filter = "alpha(opacity=" + (_value + speed) + ")";
				}else{//元素移动
					obj.style[att] = _value + speed + "px";
				}
				
			}
		}
	},100);
}
