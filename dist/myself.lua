SetStatus(200)
SetHeader('Content-Type', 'application/zip')
reader = assert(unix.open(arg[-1], unix.O_RDONLY))
while true do
data = unix.read(reader)
if data then
 if data ~= '' then
    Write(data)
 else
    break
 end
end
end
assert(unix.close(reader))