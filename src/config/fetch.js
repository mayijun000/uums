
import { baseUrl } from './env'
import { getStore } from "@/config/mUtils"
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();

	if(type == 'GET') {
		let dataStr = '?temp='+ new Date().getTime()+ '&'; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
		})
		
		dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		url = url + dataStr;
	}
	let token = getStore("token");

	if(window.fetch && method == 'fetch') {
		
		var headers = new Headers();
	    headers.append('Accept', 'application/json'); 
	    headers.append('Content-Type', 'application/json'); 
	    headers.append('token', token); 
	    
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: headers,
			mode: "cors",
			//cache: "no-cache"
		}

		if(type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			if(response.status == 200) {
				let res = response.json();
				res.then(function(value) {
					if(value.errorCode == "3010") {
						window.location.href = baseUrl;
					}
				})
				return res;
			}
		} catch(error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if(window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if(type == 'POST') {
				if(typeof(data)=="string"){
					sendData = data
				}else{
					sendData = JSON.stringify(data)
				}
			}

			requestObj.open(type, url, true);
			requestObj.withCredentials = true;
			requestObj.setRequestHeader("Content-type", "application/application/json");
			requestObj.setRequestHeader("token", token);
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if(requestObj.readyState == 4) {
					if(requestObj.status == 200) {
						let obj = requestObj.response
						if(typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						if(obj.errorCode == "3010") {
							window.location.href = baseUrl;
						} else {
							resolve(obj)
						}
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}