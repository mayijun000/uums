/**
 * 配置编译环境和线上环境之间的切换
 * 
 * 
 */

let baseUrl = "";
if (process.env.NODE_ENV == 'development') {
	baseUrl = "/";
}else if(process.env.NODE_ENV == 'testing'){//测试环境
	baseUrl = "/uums";
}else{
	baseUrl = "/uums";
}
let backUrl = location.protocol+ "//" + window.location.host;

let realNameCallBack= "&url=" + backUrl + "/uums/%23/aishuibao";

export {
	baseUrl,
	realNameCallBack,
}