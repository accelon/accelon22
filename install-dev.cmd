cmd/c npm i
cd ..
mkdir node_modules
cmd/c npm i diff
     
git clone https://github.com/accelon/ptk
git clone https://github.com/accelon/lossless-simplified-chinese
git clone https://github.com/dhamma/provident-pali
     
cd node_modules
mklink/j ptk ..\ptk
mklink/j lossless-simplified-chinese ..\lossless-simplified-chinese
mklink/j provident-pali ..\provident-pali
cd ..