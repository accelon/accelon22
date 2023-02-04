@echo Updating all dependencies
cmd/c git pull

cd ..
cd lossless-simplified-chinese
cmd/c git pull
cd ..

cd provident-pali
cmd/c git pull
cd ..


cd ptk
cmd/c git pull
cmd/c npm run build-cjs
cd ..

cd accelon22