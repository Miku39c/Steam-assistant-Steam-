/**
 * steamApis.js
 * @file 存储单方面的steam网络请求数据包发送格式(Api) [用于完成steam一些特定的功能]
 */

//-------------------------------------------------------------------------------------------------------------
// steam api
function setRemarks(profileID, remarkName) {
	var URL = "https://steamcommunity.com/profiles/" + profileID + "/ajaxsetnickname/";
	jQuery.post(URL, {
		nickname: remarkName,
		sessionid: g_sessionID
	}, function(response) {
		if (response.success === false) {
			console.log("设置备注失败了!");
		} else {
			console.log("成功设置备注于");
		}
	}).fail(function() {
		console.log("无法设置备注于");
	}).always(function() {
		//console.log("当前处理了 " + (i + 1) + "个, 总计 " + total + " 个好友.");
	});
}

class ConfirmDialog {

    static open(strTitle, strDescription, strOKButton, strCancelButton, strSecondaryActionButton) {
        return ExtensionLayer.runInPageContext((a,b,c,d,e) => {
            let prompt = ShowConfirmDialog(a,b,c,d,e);

            return new Promise((resolve, reject) => {
                prompt.done(result => {
                    resolve(result);
                }).fail(() => {
                    resolve("CANCEL");
                });
            });
        },
        [
            strTitle,
            strDescription,
            strOKButton,
            strCancelButton,
            strSecondaryActionButton
        ],
        true);
    }
}
// ConfirmDialog.open("TEST");


