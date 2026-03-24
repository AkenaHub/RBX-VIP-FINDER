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
        } else {
            console.log(JSON.stringify({ url, isValid: false }));
        }
    } catch (e) {}
};

setInterval(checkServer, 1000);
