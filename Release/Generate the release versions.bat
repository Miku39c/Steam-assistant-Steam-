@echo off
color 3F
title 文件合并生成器
del Release.js
echo 正在生成文件...
REM 使用UTF-8编码
chcp 65001
REM 读取脚本最前面的元数据
findstr "\/\/ " ..\main.js >> Release.js
REM 换行
chcp 65001
echo.>> Release.js
chcp 65001
more ..\databaseConf.js >> Release.js
more ..\resource.js >> Release.js
chcp 65001
more ..\res\injectCSS.js >> Release.js
chcp 65001
more ..\res\injectHTML.js >> Release.js
chcp 65001
more ..\res\injectJS.js >> Release.js
chcp 65001
more ..\ui\uiStyle.js >> Release.js
chcp 65001
more ..\steamData.js >> Release.js
more ..\src\shortcuts.js >> Release.js
REM more ..\webSocket.js >> Release.js
more ..\common.js >> Release.js
more ..\translateApis.js >> Release.js
more ..\externalApis.js >> Release.js
more ..\steamApis.js >> Release.js
more ..\steamApps.js >> Release.js
more ..\steamExtend.js >> Release.js
more ..\utility.js >> Release.js
more ..\ui\ui.js >> Release.js
more ..\ui\menu_friends_ui.js >> Release.js
more ..\ui\menu_friends_invite_ui.js >> Release.js
more ..\ui\menu_shielding_ui.js >> Release.js
more ..\ui\menu_gameFriend_ui.js >> Release.js
more ..\ui\menu_liveAdmin_ui.js >> Release.js
more ..\ui\menu_following_Players_ui.js >> Release.js
more ..\ui\menu_groups_ui.js >> Release.js
more ..\ui\menu_groups_invite_ui.js >> Release.js
more ..\ui\uiHandler.js >> Release.js
more ..\event.js >> Release.js
REM more ..\src\cityList.js >> Release.js
more ..\app.js >> Release.js
REM 从指定行数开始读取到最后，添加到文件里

REM more +126 "..\main.js" >> Release.js
REM 使用默认的GBK编码
color 2F
chcp 936
echo 文件生成完毕，请检查生成结果!
echo 如果出现乱码请将文本编码转为utf-8后重试!
pause
