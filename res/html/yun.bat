@echo off
color 3F
title 多语言文件生成器(html专用)
java -jar yun.jar

del ..\language\languagesList.js

REM 遍历整个文件夹里的所有.js文件
for %%i in (*.js) do (

  for %%b in (%%i) do (
    if not "%%~zb" == "0" (
      type %%i >> languagesList.js.txt
    ) else echo=>> languagesList.js.txt
  )
  REM 换行
  echo=>> languagesList.js.txt
)

move languagesList.js.txt ..\language\
ren ..\language\languagesList.js.txt languagesList.js

echo 多语言文件生成成功，请处理!
pause