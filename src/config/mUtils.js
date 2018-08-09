/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if(!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if(!name) return;
	window.localStorage.removeItem(name);
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
	if(!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
	if(!name) return;
	window.sessionStorage.removeItem(name);
}

//手机号校验
export const isPhoneVailable = pone => {
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if(!reg.test(pone)) {
		return false;
	} else {
		return true;
	}
}
//获取url参数
export const getQueryString = name => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

export const urlSearch = name => {
	let str = location.href; //取得整个地址栏
	
	let num = str.indexOf("?")
	str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = str.match(reg);
	return unescape(r[2])
}
