const dotenv = require('dotenv')
const app = require('./config/express');
const { port } = require('./config/siteConfig');

dotenv.config()


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})