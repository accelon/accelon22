# accelon22
es6, codemirror, in-memory ptk, export as self-contain zip

## 安裝開發環境步驟
   windows 執行 install-dev.cmd
   linux 下 mklink 改為 ln
     
## 目錄說明
     
     src 源代碼
     dist 要給用戶之檔案
     node_modules       svelte 及 esbuild ，不要放任何git repo
     

## 加上資料庫 (詳細步驟見 github.com/accelon/ptk )

      開一個資料庫repo ，名為 xxx
      製作並用ptk js 產生 js 版資料庫

     在 accelon22\dist 目錄中
     mklink/j  dist\xxx ..\xxx\xxx
     
     修改 dist\config.js 
    window.accelon22= {preload:"xxx,yyy"}

     
## 開發 Accelon22
     cd 2022\accelon22
     dev
 
 
 
 
 
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


## todo
pack into a redbean to freeze a working version
mao english and chinese

filter chunk name, full text search in filtered titled
introductory page by click ptk name

