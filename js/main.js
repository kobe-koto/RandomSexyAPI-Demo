/* Encoding: UTF-8 */
/* Copyright kobe-koto | Under AGPL-3.0 | Open Source Code in GitHub */
window.onload = function () {
	document.getElementById("type").value = "fur";
	document.getElementById("send-request").onclick = function () {
		var request = new XMLHttpRequest();
		request.open("GET","https://" + document.getElementById("type").value + ".random-sexy-img.koto.workers.dev/114514.index?value=1919810", true);
		request.send();
		document.getElementById("return-data").innerHTML = "正在進行GET請求，請坐和放寬。";
		request.onload = function () {
			request.onerror = function () {};
			document.getElementById("return-data").innerHTML = request.response;
			ReturnJSON = JSON.parse(request.response);
		}
		request.onerror = function () {
			request.onload = function () {}
			document.getElementById("return-data").innerHTML = "無法完成請求。請再試一遍。如果仍無法請求，請聯係admin@koto.cc反饋問題。";
		}
	}
	document.getElementById("request-img-to-preview").onclick = function () {
		document.getElementById("img-preview").src = ReturnJSON.url;
		document.getElementById("img-states").innerHTML = "正在進行請求，請坐和放寬。";
		document.getElementById("img-preview").onload = function () {
			document.getElementById("img-preview").onerror = function () {};
			if (document.getElementById("img-preview").offsetWidth > document.getElementById('right-img-preview').offsetWidth) {
				document.getElementById("img-preview").style.width='100%';
			}
			if (document.getElementById("img-preview").offsetHeight > document.getElementById('right-img-preview').offsetHeight) {
				document.getElementById("img-preview").style.Height='100%';
			}
			document.getElementById("img-states").innerHTML = "請求成功。";
		}
		document.getElementById("img-preview").onerror = function () {
			document.getElementById("img-preview").onload = function () {};
			document.getElementById("img-states").innerHTML = "我們無法完成請求。請再試一遍。如果仍無法請求，請聯係admin@koto.cc反饋問題。";
		}
	}
	document.getElementById("type").onkeypress = document.getElementById("type").onkeydown = document.getElementById("type").onkeyup = function () {
		if (document.getElementById("type").value == "fur" || document.getElementById("type").value == "gay") {
			document.getElementById("type-check").innerHTML = "符合預期，檢查通過。";
			clearTip = setTimeout(function () {
				document.getElementById("type-check").style.display = "none";
			},10000)
		} else {
			clearTimeout(clearTip);
			document.getElementById("type-check").innerHTML = "這不符合預期，應爲fur或gay。";
			document.getElementById("type-check").style.display = "block";
		}
	}
}
