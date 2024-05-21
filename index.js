const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    res.send(`Hello World! Current timestamp: ${timestamp}`);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
