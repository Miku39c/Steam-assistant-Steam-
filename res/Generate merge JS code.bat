@echo off
color 3F
title 文件合并生成器(res专用JS代码生成器)

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

echo 正在生成文件...

call "html multi-language.bat"
call css.bat
call js.bat

REM 使用默认的GBK编码
chcp 936 & cls & echo=
color 2F
echo 文件生成完毕，请检查生成结果!
echo 如果出现乱码请将文本编码转为utf-8后重试!
timeout 2