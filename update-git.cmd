@echo Updating all dependencies

cmd/c git pull
cd ..
cmd/c npm i -g .\ptk

cd ptk
cmd/c git pull
cd ..

cd lossless-simplified-chinese
cmd/c git pull
cd ..

cd provident-pali
cmd/c git pull
cd ..


cd accelon22