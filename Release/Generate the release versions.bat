@echo off
del Release.js
echo ���������ļ�...
REM �����������ݽṹ
pushd ..\config\
call "Generate merge JS code.bat"
popd
pushd ..\res\
call "Generate merge JS code.bat"
popd
color 3F
title �ļ��ϲ�������(���а�)
REM ʹ��UTF-8����
chcp 65001 & cls & echo=
REM ��ȡ�ű���ǰ���Ԫ����
findstr "\/\/ " ..\main.js >> Release.js
REM ɾ��"// @require      file:"�������ƵĴ���
findstr /v /i /c:"// @require" /c:"oranges" Release.js >Release1.js
del Release.js
ren Release1.js Release.js
REM ����
echo=>> Release.js
more ..\config\databaseConf.js >> Release.js
more ..\config\_AutoGeneration_ConfS.js >> Release.js
more ..\common.js >> Release.js
more ..\resource.js >> Release.js
more ..\res\_AutoGeneration_CSSs.js >> Release.js
more ..\res\_AutoGeneration_HTMLs.js >> Release.js
more ..\res\_AutoGeneration_JSs.js >> Release.js
more ..\res\language\languagesList.js >> Release.js
more ..\ui\_UI_Style.js >> Release.js
more ..\steamData.js >> Release.js
more ..\src\shortcuts.js >> Release.js
more ..\webSocket.js >> Release.js
more ..\translateApis.js >> Release.js
more ..\externalApis.js >> Release.js
more ..\steamApis.js >> Release.js
more ..\steamApps.js >> Release.js
more ..\steamExtend.js >> Release.js
more ..\utility.js >> Release.js
more ..\ui\_UI_multi_language_support.js >> Release.js
more ..\ui\ui.js >> Release.js
more ..\ui\ui_menu_friends.js >> Release.js
more ..\ui\ui_menu_friends_invite.js >> Release.js
more ..\ui\ui_menu_shielding.js >> Release.js
more ..\ui\ui_menu_gameFriend.js >> Release.js
more ..\ui\ui_menu_liveAdmin.js >> Release.js
more ..\ui\ui_menu_following_Players.js >> Release.js
more ..\ui\ui_menu_groups.js >> Release.js
more ..\ui\ui_menu_groups_invite.js >> Release.js
more ..\ui\_UI_Handler.js >> Release.js
more ..\event.js >> Release.js
REM more ..\src\cityList.js >> Release.js
more ..\app.js >> Release.js
REM ��ָ��������ʼ��ȡ�������ӵ��ļ���
REM more +126 "..\main.js" >> Release.js
REM ʹ��Ĭ�ϵ�GBK����
chcp 936 & cls & echo=

del temp.txt
findstr /n  "(async()=>{" ..\main.js >> temp.txt
for /f "delims=^: tokens=1,*" %%i in (temp.txt) do (set i=%%i)
set /a start = i-1
more +%start% "..\main.js" >> Release.js
del temp.txt

color 2F
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
timeout 3