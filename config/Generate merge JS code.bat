@echo off
color 3F
title �ļ��ϲ�������(configר��JS����������)
del confMerge.js
del confMerge_handle.js
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

REM more g_languageList.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_languageList.js"') do echo %%~a >> confMerge.js
REM �������еĺϲ�
for %%b in (g_languageList.js) do (
  if not "%%~zb" == "0" (
    type g_languageList.js >> confMerge.js
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
REM for /f "delims=" %%a in ('type "confMerge.js"') do echo %%~a^\n^\ >> confMerge_handle.js

REM ���������е��޸�
REM for /f "delims=" %%a in ('type "confMerge.js"') do (
REM   if not "%%~zb" == "0" (
REM     echo %%a^\n^\ >> confMerge_handle.js
REM   ) else echo=>> confMerge_handle.js
REM )
REM )

REM ����ַ�����ʼ"��'�ʹ���ע�뺯����ʼ
chcp 936 & cls & echo=
REM echo ��ȷ��Ҫ������ļ�ע��ȫ��ʹ�õ���/**/���ģ���������Ӣ�ķ��ŵ�"����'
call colstr 30 0 "��ȷ��Ҫ������ļ�ע��ȫ��ʹ�õ���" 0 1 0
call colstr 3f 0 "����ע��" 0 1 0
call colstr 30 0 "���ģ���������Ӣ�ķ��ŵ�" 0 1 0
call colstr 3f 0 "��" 0 1 0
call colstr 30 0 "����" 0 1 0
call colstr 3f 0 "'" 0 1 1
set /p before=�������ַ�����ʶ��"����':
chcp 65001 & cls & echo=
echo addNewScript('g_conf_Script', %before%\>> confMerge_handle.js

REM �������е��޸�
for /f "tokens=1* delims=:" %%a in ('findstr .* /n confMerge.js') do (
  if not "%%~zb" == "0" (
    echo %%b^\n^\>> confMerge_handle.js
  ) else echo=>> confMerge_handle.js
)

REM ����ַ�������"��'�ʹ���ע�뺯������
echo %before%);>> confMerge_handle.js

del confMerge.js
REM ʹ��Ĭ�ϵ�GBK����
chcp 936 & cls & echo=
color 2F
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
timeout 2