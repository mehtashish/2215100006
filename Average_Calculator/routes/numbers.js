const express = require('express');
const axios = require('axios');
const { isValidID, filterWindow, calculateAverage } = require('../functions/number');

const router = express.Router();
const WINDOW_SIZE = 10;
let numberWindow = [];

router.get('/:numberid', async (req, res) => {
    const id = req.params.numberid;

    if (!isValidID(id)) return res.status(400).json({ error: 'Invalid number ID' });

    let numbers = [];
    try {
        const { data } = await axios.get(`http://20.244.56.144/test/${id}`);
        numbers = data.numbers || [];
    } catch {
    }

    const prevState = [...numberWindow];
    numberWindow = filterWindow(numberWindow, numbers, WINDOW_SIZE);
    const avg = calculateAverage(numberWindow);

    res.json({
        windowPrevState: prevState,
        windowCurrState: numberWindow,
        numbers,
        avg: Number(avg.toFixed(2)),
    });
});

module.exports = router;