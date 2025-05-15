console.log(process)

console.log(process.env.LOGNAME)
console.log(process.pid)

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`)
  })
  
process.exit(0)
  
//console.log('exit')
