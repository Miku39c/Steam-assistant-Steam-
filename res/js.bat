@echo off
color 3F
title �ļ��ϲ�������(jsר��JS����������)

echo ��ʼ�ϲ�...
REM ʹ��UTF-8����
chcp 65001 & cls & echo=

del _AutoGeneration_JSs.js
pushd js

REM ���������ļ����������.js�ļ�
for %%i in (*.js) do (
  for %%b in (%%i) do (
    if not "%%~zb" == "0" (
      type %%i >> _AutoGeneration_JSs.js.tmp
      )
  )
  REM ����
  echo=>> _AutoGeneration_JSs.js.tmp
)

for %%b in (..\injectJS.js) do (
    if not "%%~zb" == "0" (
      type ..\injectJS.js >> _AutoGeneration_JSs.js.tmp
    ) else echo=>> _AutoGeneration_JSs.js.tmp
)

move _AutoGeneration_JSs.js.tmp ..\_AutoGeneration_JSs.js
popd
chcp 936 & cls & echo=