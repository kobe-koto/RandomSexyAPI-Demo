/* Encoding: UTF-8 */
/* Copyright kobe-koto | Under AGPL-3.0 | Open Source Code in GitHub */
const ApiURL = "https://rsi.koto.cc/";
const ApiType = "?type=json";
const availableType = ["fur","gay","transfur"];
function CheckType (TypeNow) {
	for (var i=0;i<availableType.length;i++) {
		if (TypeNow.toLowerCase()  == availableType[i].toLowerCase() ) {
			document.getElementById("type-check").innerHTML = "符合預期, 檢查通過. ";
			document.getElementById("send-request").className = "button";
			document.getElementById("send-request").disabled = false;
			return null;
		}
	}

	for (var e=0,Word="這不符合預期, 應爲";e<availableType.length;e++) {
		if (e == availableType.length-1) {
			Word = Word + availableType[e].toLowerCase() + ". ";
			document.getElementById("type-check").innerHTML = Word;
		} else {
			Word = Word + availableType[e].toLowerCase() + "或";
		}
	}
	document.getElementById("type-check").style.display = "block";
	document.getElementById("send-request").className = "button disabled";
	document.getElementById("send-request").disabled = true;
}

function onResize () {
	document.getElementById("settings").style.height = document.getElementById("main-window").clientHeight - document.getElementById("copyright").clientHeight + "px";
}
window.onload = function () {



	// window.onresize = function () {onResize ()};
	// onResize ();

	CheckType (document.getElementById("type").value);

	for (var e=0,Word="api前綴，如";e<availableType.length;e++) {
		if (e == availableType.length-1) {
			Word = Word + availableType[e].toLowerCase() + ". ";
			document.getElementById("type").placeholder = Word;
		} else {
			Word = Word + availableType[e].toLowerCase() + "或";
		}
	}


	document.getElementById("type").onkeypress = document.getElementById("type").onkeydown = document.getElementById("type").onkeyup = function () {
		CheckType (document.getElementById("type").value);
	}

	document.getElementById("send-request").onclick = function () {
		var request = new XMLHttpRequest();
		var requestURL = ApiURL + document.getElementById("type").value + ApiType;
		request.open("GET",requestURL,true);
		document.getElementById("return-data").innerHTML = "正在進行GET請求, 請坐和放寬. ";
		request.onload = function () {
			request.onerror = function () {};
			document.getElementById("return-data").innerHTML = request.response;
			ReturnJSON = JSON.parse(request.response);

			document.getElementById("request-img-to-preview").disabled = false;
			document.getElementById("request-img-to-preview").className = "button";
			document.getElementById("request-img-to-preview").title = "按這裏請求圖像! 就是這裏! ";
		}
		request.onerror = function () {
			request.onload = function () {}
			document.getElementById("return-data").innerHTML = "無法完成請求. 請再試一遍. 如果仍無法請求, 請聯係admin@koto.cc反饋問題. ";
		}

		request.send(); // 🚀🚀🚀
	}
	document.getElementById("request-img-to-preview").onclick = function () {
		document.getElementById("img-preview").src = ReturnJSON.url;// 超級多的🚀！
		document.getElementById("img-states").innerHTML = "正在進行請求, 請坐和放寬. ";
		document.getElementById("img-preview").onload = function () {
			document.getElementById("img-preview").onerror = function () {};
			if (document.getElementById("img-preview").offsetWidth > document.getElementById('right-img-preview').offsetWidth) {
				document.getElementById("img-preview").style.width='100%';
			}
			document.getElementById("request-img-to-preview").className = "button disabled";
			document.getElementById("request-img-to-preview").disabled = true;
			document.getElementById("request-img-to-preview").title = "你已經請求過圖像了吧! ";
			document.getElementById("img-states").innerHTML = "請求成功. ";
		}

		document.getElementById("img-preview").onerror = function () {
			document.getElementById("img-preview").onload = function () {};
			document.getElementById("img-states").innerHTML = "我們無法完成請求. 請再試一遍. 如果仍無法請求, 請聯係admin@koto.cc反饋問題. ";
		}
	}



	var resize = document.getElementById("resize");
	var left = document.getElementById("left-setting-zone");
	var right = document.getElementById("right-img-preview");
	var box = document.getElementById("main-window");
	resize.onmousedown = function(e){
		var startX = e.clientX;
		resize.left = resize.offsetLeft;
		document.onmousemove = function(e){
			var endX = e.clientX;

			var moveLen = resize.left + (endX - startX);
			var maxT = box.clientWidth - resize.offsetWidth;
			if(moveLen<235) moveLen = 235;
			if(moveLen>maxT-235) moveLen = maxT-235;

			resize.style.left = moveLen;
			left.style.width = moveLen + "px";
			right.style.width = (box.clientWidth - moveLen - 5) + "px";
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	}
}
