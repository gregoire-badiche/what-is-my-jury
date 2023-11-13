const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json());
const port = 3000

results = fs.readFileSync(__dirname + "/infos.json");
results = JSON.parse(results);

app
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    .get('/select', (req, res) => {
        if(req.headers.cookie != undefined) {
            res.sendFile(__dirname + '/nope.html')
        }
        res.sendFile(__dirname + '/select.html')
    })
    .post('/answer', (req, res) => {
        if(results[req.body.com] == undefined) {        
            results[req.body.com] = {
                "maths": 0,
                "spc": 0,
                "amc": 0,
                "nsi": 0,
                "svt": 0,
                "ses": 0,
                "hlp": 0,
                "hggsp": 0,
                "llce": 0
            };
        }
        results[req.body.com][req.body.spe1] += 1;
        results[req.body.com][req.body.spe2] += 1;
        res.redirect(`results/${req.body.com}`);
        fs.writeFile(__dirname + '/infos.json', JSON.stringify(results), () => {});
    })
    .get('/results/:com', (req, res) => {
        res.sendFile(__dirname + '/results.html');
    })
    .get('/infos/:com', (req, res) => {
        res.send(JSON.stringify(results[req.params.com]));
    })
    .get('/script.js', (req, res) => {
        res.sendFile(__dirname + '/script.js');
    })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})