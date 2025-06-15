const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let conditions = []

app.post('/api/conditions', (req, res) => {
    const {temperature, humidity, pressure, altitude  } = req.body;
    try {
        conditions.push({
            temperature: temperature,
            humidity: humidity,
            pressure: pressure,
            altitude: altitude,
            time: new Date()});
        return res.status(200).json({message: 'saved', conditions: conditions});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error', error: error});
    }
})

app.get('/api/conditions', (req, res) => {
    try {
        console.log(conditions);
        return res.status(200).json({message: 'conditions:', conditions});
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})