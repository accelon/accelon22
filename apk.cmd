del/q ..\fycm\views\*.*
del/q ..\fycm\views\cm\*.*
copy/y dist\*.* ..\fycm\views\
copy/y dist\cm\*.* ..\fycm\views\cm
cd ..\fycm
cmd/c androidjs b
cd ..\accelon22