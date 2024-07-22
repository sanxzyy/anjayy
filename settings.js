//base by DGXeon (Xeon Bot Inc.)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: t.me/xeonbotinc
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon
const fs = require('fs')
const chalk = require('chalk')

global.ownerNomer= '6282114680993'
global.ownerNama = 'SanXzy'
global.botNama = 'Xzy Bot'
global.packname = 'Sticker By'

global.author = 'Xzy Bot\nContact: +6285793433348'
global.prefa = ['','!','.','#','&']
global.thumb = fs.readFileSync('./functions/media/thumb.jpg')
global.link = 'https://chat.whatsapp.com/FIWUUTAx59nBwEi4S4uigh'

global.mess = {
  succes: '*Done*', 
  group: '*Hanya Bisa Di Gunakan Di Group*', 
  botAdmin: '*Jadiin Bot Admin Dong Biar Bisa*', 
  admin: '*Fitur Khusus Admin*', 
  bot: '*Fitur Khusus Nomer Bot*', 
  owner: '*Fitur Khusus Owner*', 
  wait: '*Wait Loading...*', 
  error: '*Fitur Sedang Eror*', 
  prem: '*Fitur Khusus User Premium*', 
  blockk: '*Kamu Telah Di Block Jadi Nya Gabisa Akses Fitur Ini*'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.greenBright(`Update'${__filename}'`))
  delete require.cache[file]
  require(file)
})