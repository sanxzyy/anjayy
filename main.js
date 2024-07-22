//base by DGXeon (Xeon Bot Inc.)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: t.me/xzy
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon

require('./settings')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const figlet = require('figlet')
const PhoneNumber = require('awesome-phonenumber')
//=========================================================//
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./functions/lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./functions/lib/myfunc')
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }
const { default: xzyConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers} = require('@whiskeysockets/baileys')
//=========================================================//
const NodeCache = require('node-cache')
const Pino = require('pino')
const readline = require('readline')
const { parsePhoneNumber } = require('libphonenumber-js')
const makeWASocket = require('@whiskeysockets/baileys').default
const store = makeInMemoryStore({ logger: pino().child({level: 'silent', stream: 'store' })})
let phoneNumber = '6282114680993'
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))
//=========================================================//
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
//=========================================================//
console.log(chalk.cyanBright(figlet.textSync(`Xzy Bot`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
})))
//=========================================================//
console.log(chalk.yellowBright(`Info Bot`))
console.log(chalk.cyanBright(`».Versi Bot : 1.0.0`))
console.log(chalk.cyanBright(`».Nama Bot : ${botNama}`))
console.log(chalk.cyanBright(`».Pemilik Bot : ${ownerNama}`))
//=========================================================//
console.log(chalk.yellowBright(`\nThanks To`))
console.log(chalk.cyanBright(`».DGXeon ( Base Bot )`))
console.log(chalk.cyanBright(`».Dan Creator Bot Lainnya\n`))
//=========================================================//
async function startxzy() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const {state, saveCreds } =await useMultiFileAuthState(`./connect`)
//=========================================================//
const msgRetryCounterCache = new NodeCache()
const xzy = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: !pairingCode,
browser: Browsers.windows('Firefox'),
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
//=========================================================//
markOnlineOnConnect: true,
generateHighQualityLinkPreview: true,
getMessage: async (key) => {
let jid = jidNormalizedUser(key.remoteJid)
let msg = await store.loadMessage(jid, key.id)
return msg?.message || ""},
msgRetryCounterCache,
defaultQueryTimeoutMs: undefined,
})
store.bind(xzy.ev)
//=========================================================//
if (pairingCode && !xzy.authState.creds.registered) {
if (useMobile) throw new Error('Terjadi Kesalah Tidak Terduga')
let phoneNumber
if (!!phoneNumber) {
phoneNumber = await question(chalk.greenBright(`Masukan Nomer WhatsApp Anda : `))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
//=========================================================//
if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()}}
//=========================================================//
setTimeout(async () => {
let code = await xzy.requestPairingCode(phoneNumber)
code = code?.match(/.{1,4}/g)?.join("-") || code
console.log(chalk.greenBright(`Kode Login WhatsApp Anda :`), chalk.black(chalk.white(code)))
}, 3000)}
//=========================================================//
xzy.ev.on('messages.upsert', async chatUpdate => {
try {
const mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' )
if (!xzy.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
const m = smsg(xzy, mek, store)
require("./sanxzy")(xzy, m, chatUpdate, store)
} catch (err) {
console.log(err)
}})
//=========================================================//
xzy.ev.on('messages.upsert', async chatUpdate => {
if (global.autoswview){
mek = chatUpdate.messages[0]
if (mek.key && mek.key.remoteJid === 'status@broadcast') {
await xzy.readMessages([mek.key]) }
}})
//=========================================================//
 xzy.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + "@" + decode.server || jid
} else return jid
}
//=========================================================//
xzy.ev.on('contacts.update', update => {
for (let contact of update) {
let id = xzy.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = {
id,
name: contact.notify
}}})
//=========================================================//
xzy.sendButtonMsg = async (jid, body = '', footer = '', title = '', media, buttons = [], quoted, options = {}) => {
const msg = await generateWAMessageFromContent(jid, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2,
},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: body }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
header: proto.Message.InteractiveMessage.Header.fromObject({
title,
hasMediaAttachment: !!media,
...(media ? await generateWAMessageContent({
[media.type]: media.url ? { url: media.url } : media.data
}, {
upload: xzy.waUploadToServer
}) : {})
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: buttons.map(a => {
return {
name: a.name,
buttonParamsJson: JSON.stringify(a.buttonParamsJson ? (typeof a.buttonParamsJson === 'string' ? JSON.parse(a.buttonParamsJson) : a.buttonParamsJson) : '')
}
})
}),
mentionedJid: options.mentions || [],
...options.contextInfo,
...(quoted ? {
stanzaId: quoted.key.id,
remoteJid: quoted.key.remoteJid,
participant: quoted.key.participant || quoted.key.remoteJid,
fromMe: quoted.key.fromMe,
quotedMessage: quoted.message
} : {})
})
}
}
}, {});
await xzy.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
//=========================================================//
xzy.getName = (jid, withoutContact = false) => {
id = xzy.decodeJid(jid)
withoutContact = xzy.withoutContact || withoutContact
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = xzy.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === xzy.decodeJid(xzy.user.id) ?
xzy.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}
//=========================================================//
xzy.public = false
xzy.serializeM = (m) => smsg(xzy, m, store)
xzy.ev.on('connection.update',async(s) => {
const { connection, lastDisconnect } = s
if (connection == "open") {
console.log(chalk.yellowBright(`Info Connect`))
console.log(chalk.cyanBright(`».Connecting Success...`))
console.log(chalk.cyanBright(`».Powered By ${botNama}`))
}
//=========================================================//
if (
connection === "close" &&
lastDisconnect &&
lastDisconnect.error &&
lastDisconnect.error.output.statusCode != 401
) {
startxzy()
}})
xzy.ev.on('creds.update', saveCreds)
xzy.ev.on("messages.upsert",() => { })
//=========================================================//
xzy.sendText = (jid, text, quoted = '', options) => xzy.sendMessage(jid, {text: text,...options}, {quoted,...options})
xzy.sendTextWithMentions = async (jid, text, quoted, options = {}) => xzy.sendMessage(jid, {text: text,mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),...options}, {quoted})
//=========================================================//
xzy.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
//=========================================================//
await xzy.sendMessage(jid, {sticker: {url: buffer},...options}, {quoted})
return buffer}
xzy.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await xzy.sendMessage(jid, {sticker: {url: buffer},...options}, {quoted})
return buffer
}
//=========================================================//
xzy.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}
//=========================================================//
xzy.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await xzy.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await xzy.getName(i + '@s.whatsapp.net')}\nFN:${await xzy.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nEND:VCARD`
})
}
xzy.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}
//=========================================================//
xzy.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}}
return startxzy()
//=========================================================//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
//=========================================================//
process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})