
let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let l = groups.map(v => v.id)

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    console.log(mime)
    if (/image/.test(mime)) {
        var media = await q.download()
    }

    var caption = q && q.text ? q.text : text
    if(!caption) caption = ''

    try {
        for (let i of l) {
            await delay(500)

            if(media) await conn.sendFile(i, media, 'media.png', caption, false, {thumbnail: Buffer.alloc(0)})
            else conn.relayMessage(i, {extendedTextMessage:{text: caption, }}, {}).catch(_ => _)

            m.reply(`Sent Broadcast to ${l.length} Group`)
        }

    } catch (e) {
        return `*Media does not support!*`
    }
}
handler.help = ['bcgc <teks>']
handler.tags = ['owner']
handler.command = /^(broadcastgc|bcgc)$/i

handler.owner = true

module.exports = handler
