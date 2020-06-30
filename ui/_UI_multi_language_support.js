/**
 * 多语言支持
 */
class multiLanguage{
	constructor(arg) {
		this.l_en = 'en_GB';
		this.l_cn = 'zh_CN';
		this.l_tw = 'zh_TW';
		this.l_jp = 'jp_JP';
		this.l_auto = 'auto_detected';
	}
	/**
	 * 初始化
	 */
	init(){
		jQuery('#selectLanguageDropdown').localizationTool(languagesList_mainUI_html); //初始化
		this.readConfig(); //读取当前语言配置
	}
	/**
	 * 读取当前语言配置
	 */
	readConfig(){
		if(g_conf[0].language == "auto_detected"){
			this.setAutoDetected();
		}
		else{
			jQuery('#selectLanguageDropdown').localizationTool('translate',g_conf[0].language);
		}
	}
	/**
	 * 保存当前语言配置
	 */
	saveConfig(lang){
		g_conf[0].language = lang;
	}
	/**
	 * 设置为自动检测
	 */
	setAutoDetected(){
		var arrLang = navigator.languages;
		// 遍历浏览器语言选项，获取可以使用的语言，如何都没有则使用英语
		for (let i = 0; i < arrLang.length; i++) {
			
			if(arrLang[i].indexOf('en') != -1){ //英语系 "en-US", "en"等变种语言
				jQuery('#selectLanguageDropdown').localizationTool('translate',this.l_en);
				return true;
			}
			
			switch (arrLang[i]){
				case "zh-CN": //简体
					jQuery('#selectLanguageDropdown').localizationTool('translate',this.l_cn);
					return true;
					break;
				case "zh-TW": //繁体
					jQuery('#selectLanguageDropdown').localizationTool('translate',this.l_tw);
					return true;
					break;
				case "ja": //日语
					jQuery('#selectLanguageDropdown').localizationTool('translate',this.l_jp);
					return true;
					break;
			}
		}
		//如果都没有找到，则是不受支持的语言，默认使用英语
		jQuery('#selectLanguageDropdown').localizationTool('translate',this.l_en);
		return false;
	}
	
}