const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let temperatures = []

app.post('/api/temperatures', (req, res) => {
    const {temperature} = req.body;
    try {
        temperatures.push({temperature: temperature, time: new Date()});
        return res.status(200).json({message: 'saved', temperature: temperature});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error', error: error});
    }
})

app.get('/api/temperatures', (req, res) => {
    try {
        console.log(temperatures);
        return res.status(200).json({message: 'temperatues:', temperatures});
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})