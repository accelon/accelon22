# Accelon22

## 安裝開發環境步驟
    Windows: install-dev.cmd
    mac os/linux, 參考install-dev.cmd,  mklink 改為 ln

    
## 目錄說明   
    src 源代碼
    
    dist 要給用戶之檔案
    dist 底下為 js 資料庫，由ptk js 產生

    accelon22/node_modules     需 svelte 及 esbuild ，不要放任何git repo

    ../node_modules  instal-dev 安裝 了ptk, provident-pali,  lossless-simplified-chinese 的junction
    以及第三方的 diff

## 加上資料庫 (詳細步驟見 github.com/accelon/ptk )

### 自製資料庫
    開一個資料庫repo ，名為 xxx
    製作並用ptk js 產生 js 版資料庫

    在 accelon22\dist 目錄中
    mklink/j  dist\xxx ..\xxx\xxx

### 第三方資料
    直接將 xxx 目錄(含有000.js 001.js ...)
    複製到 accelon22/dist/xxx/ 即可 

### 設定預載資料庫
    修改 dist\config.js 
    window.accelon22= {preload:"xxx,yyy"}

## 開發 Accelon22 (修改 svelte )
    cd 2022\accelon22
    dev

將 accelon22\dist\ 下所有文件打包即可。Android 版則要安裝 [Androidjs](https://android-js.github.io/) 以產生 apk

[資料庫範例](https://github.com/accelon/eg)
  




## 以下不必看
 
 
 ## dependencies

    npm i svelte esbuild-svelte

Lazip : lazy jsZip
clone https://github.com/yapcheahshen/lazip (for node and browser)

    mklink/j node_modules/lazip ../lazip

create a minified bundle in dist
    build-lazip.cmd  

copy codemirror.js (version 5) to dist


## Developers only

download redbean latest version and save as redbean.com
create a clean accelon22.com only with files in dist


create a release build of accelon22

    node make-accelon22.js

create a developer build (http serving local folder)
    node make-accelon22.js dev

    cd dist
    start accelon22-dev.com

## qrcode
Android App 加入 掃瞄 QR Code 功能
到 https://github.com/mebjas/html5-qrcode/ release 頁 下載 html5-qrcode.min.js
放到 dist 目錄下


## todo
pack into a redbean to freeze a working version
mao english and chinese

filter chunk name, full text search in filtered titled
introductory page by click ptk name

