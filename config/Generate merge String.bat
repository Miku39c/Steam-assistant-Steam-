@echo off
color 3F
title 文件合并生成器(config专用JS字符串生成器)
del confMerge.js
del _AutoGeneration_ConfS.js
echo 正在生成文件...
REM 使用UTF-8编码
chcp 65001 & cls & echo=

REM more g_conf.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_conf.js"') do echo %%~a >> confMerge.js
REM 保留空行的合并
for %%b in (g_conf.js) do (
	if not "%%~zb" == "0" (
		type g_conf.js >> confMerge.js
	) else echo=>> confMerge.js
)

REM more g_default_configuration.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_default_configuration.js"') do echo %%~a >> confMerge.js
REM 保留空行的合并
for %%b in (g_default_configuration.js) do (
  if not "%%~zb" == "0" (
    type g_default_configuration.js >> confMerge.js
  ) else echo=>> confMerge.js
)

REM more g_debug_info.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_debug_info.js"') do echo %%~a >> confMerge.js
REM 保留空行的合并
for %%b in (g_debug_info.js) do (
  if not "%%~zb" == "0" (
    type g_debug_info.js >> confMerge.js
  ) else echo=>> confMerge.js
)

REM more g_uiConf.js >> confMerge.js
REM for /f "delims=" %%a in ('type "g_uiConf.js"') do echo %%~a >> confMerge.js
REM 保留空行的合并
for %%b in (g_uiConf.js) do (
  if not "%%~zb" == "0" (
    type g_uiConf.js >> confMerge.js
  ) else echo=>> confMerge.js
)

echo 合并完毕! 开始修改...
REM 不保留空行的修改
REM for /f "delims=" %%a in ('type "confMerge.js"') do echo %%~a^\n^\ >> _AutoGeneration_ConfS.js

REM 不保留空行的修改
REM for /f "delims=" %%a in ('type "confMerge.js"') do (
REM   if not "%%~zb" == "0" (
REM     echo %%a^\n^\ >> _AutoGeneration_ConfS.js
REM   ) else echo=>> _AutoGeneration_ConfS.js
REM )
REM )

REM 添加字符串开始"或'
chcp 936 & cls & echo=
echo 请确保要处理的文件注释全部使用的是/**/风格的，并且输入英文符号的"或者'
set /p before=请输入字符串标识符"或者':
chcp 65001 & cls & echo=
echo %before%\>> _AutoGeneration_ConfS.js

REM 保留空行的修改
for /f "tokens=1* delims=:" %%a in ('findstr .* /n confMerge.js') do (
  if not "%%~zb" == "0" (
    echo %%b^\n^\>> _AutoGeneration_ConfS.js
  ) else echo=>> _AutoGeneration_ConfS.js
)

REM 添加字符串结束"或'
echo %before%>> _AutoGeneration_ConfS.js

del confMerge.js
REM 使用默认的GBK编码
chcp 936 & cls & echo=
color 2F
echo 文件生成完毕，请检查生成结果!
echo 如果出现乱码请将文本编码转为utf-8后重试!
timeout 2