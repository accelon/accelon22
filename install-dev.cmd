cmd/c npm i -g esbuild

cmd/c npm i
cd ..
if not exist "node_module" ( 
    mkdir node_modules
)

cmd/c npm i diff


if not exist "ptk" (
    git clone https://github.com/accelon/ptk
)
cmd/c npm i -g ./ptk


if not exist "lossless-simplified-chinese" (
    git clone https://github.com/accelon/lossless-simplified-chinese
)

if not exist "provident-pali" (
    git clone https://github.com/dhamma/provident-pali
)

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
cmd/c build-cjs.cmd

cd ..\..\accelon22
