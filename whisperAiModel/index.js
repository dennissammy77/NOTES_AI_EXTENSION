const fs = require('fs');
const OpenAi = require('openai');
const PDFDocument = require('pdfkit');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey)
const openai = new OpenAi({apiKey});
const doc = new PDFDocument();

async function main() {
	if (apiKey === ''){
		throw new Error('Missing Api Key')
	}
	const path = '../audio.m4a';
	const options = {encoding: 'UTF-8'};
	
	function callback (err,data){
		if(err){
			console.log(err);
			throw new Error('Error reading file');
		}
		return data;
	}
	
	const transcription = await openai.audio.transcriptions.create({
		file: fs.createReadStream(path),
		model: "whisper-1",
		response_format: "text"
	});
	
	console.log(transcription);
	const systemPrompt = 'You are a helpful assistant, your task is to provide a detailed summary of the transcribed audio file, and provide the timestamps for the key areas of the audio that I need to focus on to understand the contents of the audio';

	const completion = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		//temperature: temperature,
		messages: [
			{
				role: "system",
				content: systemPrompt
			},
			{
				role: "user",
				content: transcription
			}
		]
	});
	//console.log(completion.choices[0].message.content);
	doc.pipe(fs.createWriteStream('summary.pdf'));
	doc
		.fontSize(24)
		.text('Summary from audio file');
	doc
		.fontSize(16)
		.text(completion.choices[0].message.content)
	doc.end();
};

main();
