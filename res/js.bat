@echo off
color 3F
title 文件合并生成器(js专用JS代码生成器)

echo 开始合并...
REM 使用UTF-8编码
chcp 65001 & cls & echo=

del JSs.js
pushd js
REM 遍历整个文件夹里的所有.html文件
for %%i in (*.js) do (

  for %%b in (%%i) do (
    if not "%%~zb" == "0" (
      type %%i >> JSs.js
    ) else echo=>> JSs.js
  )
  REM 换行
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