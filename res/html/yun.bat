@echo off
color 3F
title �������ļ�������(htmlר��)
java -jar yun.jar

del ..\language\languagesList.js

REM ���������ļ����������.js�ļ�
for %%i in (*.js) do (

  for %%b in (%%i) do (
    if not "%%~zb" == "0" (
      type %%i >> languagesList.js.txt
    ) else echo=>> languagesList.js.txt
  )
  REM ����
  echo=>> languagesList.js.txt
)

move languagesList.js.txt ..\language\
ren ..\language\languagesList.js.txt languagesList.js

echo �������ļ����ɳɹ����봦��!
pause