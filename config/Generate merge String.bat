@echo off
color 3F
title �ļ��ϲ�������(configר��JS�ַ���������)
del confMerge.js
del _AutoGeneration_ConfS.js
echo ���������ļ�...
REM ʹ��UTF-8����
chcp 65001 & cls & echo=

REM more g_conf.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_conf.js"') do echo %%~a >> confMerge.js
REM �������еĺϲ�
for %%b in (g_conf.js) do (
	if not "%%~zb" == "0" (
		type g_conf.js >> confMerge.js
	) else echo=>> confMerge.js
)

REM more g_default_configuration.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_default_configuration.js"') do echo %%~a >> confMerge.js
REM �������еĺϲ�
for %%b in (g_default_configuration.js) do (
  if not "%%~zb" == "0" (
    type g_default_configuration.js >> confMerge.js
  ) else echo=>> confMerge.js
)

REM more g_debug_info.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_debug_info.js"') do echo %%~a >> confMerge.js
REM �������еĺϲ�
for %%b in (g_debug_info.js) do (
  if not "%%~zb" == "0" (
    type g_debug_info.js >> confMerge.js
  ) else echo=>> confMerge.js
)

REM more g_uiConf.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_uiConf.js"') do echo %%~a >> confMerge.js
REM �������еĺϲ�
for %%b in (g_uiConf.js) do (
  if not "%%~zb" == "0" (
    type g_uiConf.js >> confMerge.js
  ) else echo=>> confMerge.js
)

echo �ϲ����! ��ʼ�޸�...
REM ���������е��޸�
REM for /f "delims=" %%a in ('type "confMerge.js"') do echo %%~a^\n^\ >> _AutoGeneration_ConfS.js

REM ���������е��޸�
REM for /f "delims=" %%a in ('type "confMerge.js"') do (
REM   if not "%%~zb" == "0" (
REM     echo %%a^\n^\ >> _AutoGeneration_ConfS.js
REM   ) else echo=>> _AutoGeneration_ConfS.js
REM )
REM )

REM ����ַ�����ʼ"��'
chcp 936 & cls & echo=
echo ��ȷ��Ҫ������ļ�ע��ȫ��ʹ�õ���/**/���ģ���������Ӣ�ķ��ŵ�"����'
set /p before=�������ַ�����ʶ��"����':
chcp 65001 & cls & echo=
echo %before%\>> _AutoGeneration_ConfS.js

REM �������е��޸�
for /f "tokens=1* delims=:" %%a in ('findstr .* /n confMerge.js') do (
  if not "%%~zb" == "0" (
    echo %%b^\n^\>> _AutoGeneration_ConfS.js
  ) else echo=>> _AutoGeneration_ConfS.js
)

REM ����ַ�������"��'
echo %before%>> _AutoGeneration_ConfS.js

del confMerge.js
REM ʹ��Ĭ�ϵ�GBK����
chcp 936 & cls & echo=
color 2F
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
timeout 2