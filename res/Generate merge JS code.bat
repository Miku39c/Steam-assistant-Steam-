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

call "html multi-language.bat"
call css.bat
call js.bat

REM ʹ��Ĭ�ϵ�GBK����
chcp 936 & cls & echo=
color 2F
echo �ļ�������ϣ��������ɽ��!
echo ������������뽫�ı�����תΪutf-8������!
timeout 2