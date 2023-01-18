@echo off
@REM 目錄建議
@REM 第一次須安裝 esbuild ，之後可以 注解掉，以加快安裝速度
cmd/c npm i -g esbuild

@REM 上一層目錄 要有 node_modules ，以方便其他 repo 共用
cmd/c npm i
cd ..
if not exist "node_module" ( 
    mkdir node_modules
)

cmd/c npm i diff


@REM 安裝 ptk
if not exist "ptk" (
    git clone https://github.com/accelon/ptk
)
@REM 安裝 ptk cli ，讓 ptk 變成通用指令
cmd/c npm i -g ./ptk


@REM accelon22 還需要這兩個包
if not exist "lossless-simplified-chinese" (
    git clone https://github.com/accelon/lossless-simplified-chinese
)

if not exist "provident-pali" (
    git clone https://github.com/dhamma/provident-pali
)

@REM 因為 node_modules 下不能有被 git 管理的目錄，故安裝在同層，然後做目錄連結。
cd node_modules

if not exist "ptk" (
    mklink/j ptk ..\ptk
)

if not exist "lossless-simplified-chinese" (
    mklink/j lossless-simplified-chinese ..\lossless-simplified-chinese
)
if not exist "provident-pali" (
    mklink/j provident-pali ..\provident-pali
)


cd ptk
@REM 造出 nodebundle.cjs
cmd/c build-cjs.cmd

cd ../accelon22
