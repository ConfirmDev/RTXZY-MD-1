var name = global.nameowner
var numberowner = global.numberowner
var gmail = global.mail
const { 
default: 
makeWASocket,
BufferJSON,
WA_DEFAULT_EPHEMERAL, 
generateWAMessageFromContent, 
downloadContentFromMessage, 
downloadHistory, 
proto,
getMessage, 
generateWAMessageContent, 
prepareWAMessageMedia 
} = require("@adiwajshing/baileys");
var handler = async (m, {
conn
}) => {
const vcard = `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN: ${name}
item.ORG: Creator Bot
item1.TEL;waid=${numberowner}:${numberowner}@s.whatsapp.net
item1.X-ABLabel:Contact
item2.EMAIL;type=INTERNET:${gmail}
item2.X-ABLabel:Email
item3.ADR:;;🇲🇾 Malaysia;;;;
item3.X-ABADR:ac
END:VCARD`
const sentMsg  = await conn.sendMessage(
    m.chat,
    { 
        contacts: { 
            displayName: 'CN', 
            contacts: [{ vcard }] 
        }
    }
)
await conn.reply(m.chat, "This is the owner", sentMsg)}
handler.command = handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.limit = true;
module.exports = handler;