@echo off
color 3F
title �ļ��ϲ�������(resר��JS����������)

REM ����ַ�����ʼ"��'
chcp 936 & cls & echo=
REM echo ��ȷ��Ҫ������ļ�ע��ȫ��ʹ�õ���/**/���ģ���������Ӣ�ķ��ŵ�"����'
call colstr 30 0 "��ȷ��Ҫ������ļ�ע��ȫ��ʹ�õ���" 0 1 0
call colstr 3f 0 "����ע��" 0 1 0
call colstr 30 0 "���ģ���������Ӣ�ķ��ŵ�" 0 1 0
call colstr 3f 0 "��" 0 1 0
call colstr 30 0 "����" 0 1 0
call colstr 3f 0 "'" 0 1 1
set /p before=�������ַ�����ʶ��"����':

echo ���������ļ�...

echo ��ʼ�޸�...
REM ʹ��UTF-8����
chcp 65001 & cls & echo=

REM �ӳٱ���
SETLOCAL ENABLEDELAYEDEXPANSION

del HTMLs.js
cd html
REM ���������ļ����������.html�ļ�
for %%i in (*.html) do (
  REM ��ȡ�ַ�������ȡ�ļ�����ȥ��.���ļ���չ��
  set str=%%i
  REM echo !str:~0,-5!

  REM ����ע�뺯����ʼ
  echo %before%\>> HTMLs.js

  REM �������е��޸ģ����ζ�ȡÿ��.html�ļ�
  for /f "tokens=1* delims=:" %%a in ('findstr .* /n %%i') do (
    if not "%%~zb" == "0" (
      echo %%b^\n^\>> HTMLs.js
    ) else echo=>> HTMLs.js
  )
  
  REM ����ַ�������"��'�ʹ���ע�뺯������
  echo %before%>> HTMLs.js
  REM ����
  echo=>> HTMLs.js
)
move HTMLs.js ..\

REM ʹ��Ĭ�ϵ�GBK����
chcp 936 & cls & echo=
color 2F
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
timeout 2