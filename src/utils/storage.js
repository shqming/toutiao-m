/**
 * 本地存储封装模块
 */

export const getItem = name => {
	const data = window.localStorage.getItem(name);
	
	
	try{
		//尝试转换data 为js对象 
		return JSON.parse(data);
	}catch(e){
		//如果 data不是JSON字符串格式则原样返回
		return data;
	}
	
	
}


export const setItem = (name, value) => {
	
	//value是对象类型转为JSON格式字符串再存储
	if( typeof value === 'object'){
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(name, value);
	
}

export const removeItem = name => {
	window.localStorage.removeItem(name);
}