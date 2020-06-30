@echo off
color 3F
title 文件合并生成器(html专用JS代码生成器)

if defined %before goto finish

REM 添加字符串开始"或'
chcp 936 & cls & echo=
REM echo 请确保要处理的文件注释全部使用的是/**/风格的，并且输入英文符号的"或者'
call colstr 30 0 "请确保要处理的文件注释全部使用的是" 0 1 0
call colstr 3f 0 "多行注释" 0 1 0
call colstr 30 0 "风格的，并且输入英文符号的" 0 1 0
call colstr 3f 0 "“" 0 1 0
call colstr 30 0 "或者" 0 1 0
call colstr 3f 0 "'" 0 1 1
set /p before=请输入字符串标识符"或者':

:finish
echo 开始修改...

REM 使用UTF-8编码
chcp 65001 & cls & echo=

del _AutoGeneration_HTMLs.js
pushd html
REM 遍历整个文件夹里的所有.html文件
for %%i in (*.html.htm) do (
  REM 延迟变量
  SETLOCAL ENABLEDELAYEDEXPANSION
  
  REM 截取字符串，获取文件名，去除.和文件拓展名
  set str=%%i
  REM echo !str:~0,-9!

  REM 代码注入函数开始
  echo var !str:~0,-9! = %before%\>> _AutoGeneration_HTMLs.js.tmp

  endlocal

  REM 保留空行的修改，依次读取每个.html文件
  for /f "tokens=1* delims=:" %%a in ('findstr .* /n %%i') do (
    if not "%%~zb" == "0" (
      echo %%b^\n^\>> _AutoGeneration_HTMLs.js.tmp
    ) else echo=>> _AutoGeneration_HTMLs.js.tmp
  )
  
  REM 添加字符串结束"或'和代码注入函数结束
  echo %before%;>> _AutoGeneration_HTMLs.js.tmp
  REM 换行
  echo=>> _AutoGeneration_HTMLs.js.tmp
)
move _AutoGeneration_HTMLs.js.tmp ..\_AutoGeneration_HTMLs.js
popd
chcp 936 & cls & echo=