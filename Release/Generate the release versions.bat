@echo off
del Release.js
echo 正在生成文件...
REM 重新生成数据结构
pushd ..\config\
call "Generate merge JS code.bat"
popd
pushd ..\res\
call "Generate merge JS code.bat"
popd
color 3F
title 文件合并生成器(发行版)
REM 使用UTF-8编码
chcp 65001 & cls & echo=
REM 读取脚本最前面的元数据
findstr "\/\/ " ..\main.js >> Release.js
REM 删除"// @require      file:"这种类似的代码
findstr /v /i /c:"// @require" /c:"oranges" Release.js >Release1.js
del Release.js
ren Release1.js Release.js
REM 换行
echo=>> Release.js
more ..\config\databaseConf.js >> Release.js
more ..\config\confMerge_handle.js >> Release.js
more ..\resource.js >> Release.js
more ..\res\CSSs.js >> Release.js
more ..\res\HTMLs.js >> Release.js
more ..\res\JSs.js >> Release.js
more ..\ui\uiStyle.js >> Release.js
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
chcp 936 & cls & echo=

del temp.txt
findstr /n  "(async()=>{" ..\main.js >> temp.txt
for /f "delims=^: tokens=1,*" %%i in (temp.txt) do (set i=%%i)
set /a start = i-1
more +%start% "..\main.js" >> Release.js
del temp.txt

color 2F
echo 文件生成完毕，请检查生成结果!
echo 如果出现乱码请将文本编码转为utf-8后重试!
timeout 3