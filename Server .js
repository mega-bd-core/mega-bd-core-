const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = {}; 

const CONFIG = {
    NOM: "Mega BD",
    COMMISSION: 0.05, // 5% de profit pour vous
    TAUX: 10          // 1MB WiFi = 10 MegaCoins
};

app.get('/', (req, res) => {
    res.send(`<h1>Mega BD Core v1.0</h1><p>Statut : En ligne et prêt.</p>`);
});

app.post('/collect', (req, res) => {
    const { userId, mb } = req.body;
    if (!users[userId]) users[userId] = { balance: 0, profit: 0 };
    
    let p = mb * CONFIG.COMMISSION;
    users[userId].balance += (mb - p) * CONFIG.TAUX;
    users[userId].profit += p;

    res.json({ solde: users[userId].balance.toFixed(2) });
});

app.listen(PORT, () => console.log(`Lancé sur ${PORT}`));
