const express = require('express');
const router = express.Router();
const Url = require('../models/url.js');
module.exports = router;

router.get('/', (req, res) => {
    Url.find({})
        .then((data) => {
            res.json(data);
        }).catch((error) => {
            console.log('Error:', error);
        })
});

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ value: req.params.code });
        if (url) {
            return res.redirect(url.key);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('SOMETHING WENT WRONG');
    }
});

const generateCode = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getNextCode = prev => {
    if (prev.length === 0) {
        return generateCode(6);
    } else {
        let last = prev[0].value;
        let flag = true;
        let res = '';
        let n = last.length - 1;
        while (flag) {
            if (!isNaN(last[n])) {
                if (last[n] === '9') {
                    res = last.substr(0, n) + '0';
                } else {
                    var i = (parseInt(last[n], 36) + 1) % 36;
                    const replacement = (!i * 10 + i).toString(36);
                    res = last.substr(0, n) + replacement + res.substr(n + 1, res.length);;
                    flag = false;
                }
            } else {
                if (last[n] === 'z') {
                    res = last.substr(0, n) + 'a';
                } else {
                    var i = (parseInt(last[n], 36) + 1) % 36;
                    const replacement = (!i * 10 + i).toString(36);
                    res = last.substr(0, n) + replacement + res.substr(n + 1, res.length);
                    flag = false;
                }
            }
            --n;
        }
        return res;

    }
}

router.post('/save', (req, res) => {
    Url.find({}).sort({ _id: -1 }).limit(1).then(prev => {
        let data = req.body;
        const code = getNextCode(prev);
        data.value = code
        const newUrl = new Url(data);
        newUrl.save((error) => {
            if (error) {
                res.status(500).json({ msg: 'Sorry, internal server errors' });
                return;
            }
            res.status(200).json('http://localhost:8080/' + data.value);
        });
    })



})
