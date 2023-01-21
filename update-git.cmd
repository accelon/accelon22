@echo Updating all dependencies

cmd/c git pull
cd ..
cmd/c npm i -g .\ptk


cd lossless-simplified-chinese
cmd/c git pull
cd ..

cd provident-pali
cmd/c git pull
cd ..


cd ptk
cmd/c git pull
npm run build-cjs
cd ..


cd accelon22