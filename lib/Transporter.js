const OpenAI = require('openai');
require('dotenv').config();


const OPENAI_TRANSPORTER = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

module.exports = OPENAI_TRANSPORTER;