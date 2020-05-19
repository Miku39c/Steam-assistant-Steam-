function injectJS(){
	var funcCode = "";
	funcCode += wordCount.toString() + "\n\n";
	funcCode += "var arrComment = []; /*id文本框的id, height文本框的高度, scrollTop存储收缩状态下的进度条, visible可见性*/" + "\n";
	funcCode += inBoxShrinkage.toString() + "\n\n";
	funcCode += "var change;" + "\n";
	funcCode += autoTextarea.toString() + "\n\n";
	funcCode += openThisAndCloseOtherAllinBoxShrinkage.toString() + "\n\n";
	funcCode += "var inBoxonblurID = 0;" + "\n";
	funcCode += addEmojiEvent.toString() + "\n\n";
	addNewScript('styles_Script',funcCode);
	
	var funcCode = "";
	funcCode += emojiFix.toString() + "\n\n";
	funcCode += dvWidthFix.toString() + "\n\n";
	funcCode += deleteSelectText.toString() + "\n\n";
	funcCode += _ySelects.toString() + "\n\n";
	addNewScript('Utility_Script',funcCode);
}

