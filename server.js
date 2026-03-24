const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

app.get('/api/generate-vip', (req, res) => {
    const id = generateId();
    const url = `https://www.roblox.com/share?code=${id}&type=Server`;

    setTimeout(() => {
        const active = Math.random() > 0.8;
        res.json({
            isValid: active,
            url: url,
            message: active ? "Server found" : "Server not found"
        });
    }, 1000);
});

app.post('/api/check-vip', (req, res) => {
    const url = req.body.url;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ isValid: false, message: "Invalid input" });
    }

    const isValidDomain = url.includes('roblox.com/share') || url.includes('roblox.com/games');
    
    if (!isValidDomain) {
        return res.status(400).json({ isValid: false, message: "Invalid domain" });
    }

    setTimeout(() => {
        const active = Math.random() > 0.3;
        res.json({ 
            isValid: active, 
            message: active ? "Server active" : "Server expired" 
        });
    }, 1500);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
