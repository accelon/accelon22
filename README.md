# accelon-ide
es6, codemirror, in-memory ptk, export as self-contain zip


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

node cleanredbean.js