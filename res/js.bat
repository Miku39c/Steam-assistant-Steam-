@echo off
color 3F
title �ļ��ϲ�������(jsר��JS����������)

echo ��ʼ�ϲ�...
REM ʹ��UTF-8����
chcp 65001 & cls & echo=

del JSs.js
pushd js
REM ���������ļ����������.html�ļ�
for %%i in (*.js) do (

  for %%b in (%%i) do (
    if not "%%~zb" == "0" (
      type %%i >> JSs.js
    ) else echo=>> JSs.js
  )
  REM ����
  echo=>> JSs.js
)

for %%b in (..\injectJS.js) do (
    if not "%%~zb" == "0" (
      type ..\injectJS.js >> JSs.js
    ) else echo=>> JSs.js
)

move JSs.js ..\
popd
chcp 936 & cls & echo=