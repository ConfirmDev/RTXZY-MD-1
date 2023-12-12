global.owner = ['60168444974']  
global.mods = ['60168444974'] 
global.prems = ['60168444974']
global.nameowner = 'Aiman'
global.numberowner = '60168444974' 
global.mail = 'syamiel2410@gmail.com' 
global.gc = '<group link>'
global.wm = '<© watermark>'
global.wait = '_*Processing...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Please wait...*'
global.packname = 'Made With'
global.author = 'AmadeusBot'
global.maxwarn = '2' // Peringatan maksimum

global.btc = 'YOUR_APIKEY_HERE' 
global.APIs = {btc: 'https://api.botcahx.live'}
global.APIKeys = {'https://api.botcahx.live': 'APIKEY'}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
