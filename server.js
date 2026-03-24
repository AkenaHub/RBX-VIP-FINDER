const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) result += chars[Math.floor(Math.random() * 36)];
    return result;
};

const checkServer = async () => {
    const url = `https://www.roblox.com/share?code=${generateId()}&type=Server`;

    try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow' });
        
        if (res.ok && res.url.includes('/games/')) {
            console.log(JSON.stringify({
                url,
                redirectedTo: res.url,
                isValid: true,
                timestamp: new Date().toISOString()
            }));

            const webhook = "https://discord.com/api/webhooks/1486090807227318283/mJGcOqsDNghUcLf4eYkrWWfGz33iy0S5JAELRIm4jrQxwUGNZN979N-aTeP6V4X4NTYK";
            if (webhook) {
                await fetch(webhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: url })
                }).catch(e => {});
            }
        }
    } catch (e) {}
};

setInterval(checkServer, 1000);
