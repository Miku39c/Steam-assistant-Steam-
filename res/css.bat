@echo off
color 3F
title �ļ��ϲ�������(cssר��JS����������)

if defined %before goto finish

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

:finish
echo ��ʼ�޸�...

REM ʹ��UTF-8����
chcp 65001 & cls & echo=

del _AutoGeneration_CSSs.js
pushd css
REM ���������ļ����������.css�ļ�
for %%i in (*.css) do (
  REM �ӳٱ���
  SETLOCAL ENABLEDELAYEDEXPANSION
  
  REM ��ȡ�ַ�������ȡ�ļ�����ȥ��.���ļ���չ��
  set str=%%i
  REM echo !str:~0,-4!

  REM ����ע�뺯����ʼ
  echo var !str:~0,-4! = %before%\>> _AutoGeneration_CSSs.js.tmp
  
  endlocal
  
  REM �������е��޸ģ����ζ�ȡÿ��.css�ļ�
  for /f "tokens=1* delims=:" %%a in ('findstr .* /n %%i') do (
    if not "%%~zb" == "0" (
      echo %%b^\n^\>> _AutoGeneration_CSSs.js.tmp
    ) else echo=>> _AutoGeneration_CSSs.js.tmp
  )
  
  REM ����ַ�������"��'�ʹ���ע�뺯������
  echo %before%;>> _AutoGeneration_CSSs.js.tmp
  REM ����
  echo=>> _AutoGeneration_CSSs.js.tmp
)
move _AutoGeneration_CSSs.js.tmp ..\_AutoGeneration_CSSs.js
popd
chcp 936 & cls & echo=