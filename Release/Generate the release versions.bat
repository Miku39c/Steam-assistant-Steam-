@echo off
color 3F
title �ļ��ϲ�������
del Release.js
echo ���������ļ�...
REM ʹ��UTF-8����
chcp 65001
REM ��ȡ�ű���ǰ���Ԫ����
findstr "\/\/ " ..\main.js >> Release.js
REM ����
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
REM ��ָ��������ʼ��ȡ�������ӵ��ļ���

REM more +126 "..\main.js" >> Release.js
REM ʹ��Ĭ�ϵ�GBK����
color 2F
chcp 936
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
pause
