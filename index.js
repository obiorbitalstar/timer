const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Task</title>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: white;
                }
                .container {
                    text-align: center;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .logo img {
                    max-width: 100%;
                    height: auto;
                }
                .logo-text {
                    font-size: 39px;
                    font-weight: bold;
                    margin-left: -44px;
                }
                .timestamp {
                    font-weight: bold;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <img src="/kabi.png" alt="Kabi Logo">
                    <div class="logo-text">DevOps Task</div>
                </div>
                <div class="timestamp">Current timestamp: ${timestamp}</div>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
