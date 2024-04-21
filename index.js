// npm install assemblyai
const fs = require('fs');

const { AssemblyAI } = require('assemblyai');

const client = new AssemblyAI({
  apiKey: "2508b230ec4948d39a92323893b0f787"
})

//const audioUrl =
  //'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'
//
//const config = {
  //audio_url: fs.readFile('./audio.mka')

const path = './audio.m4a';
const options = 'utf8';
function callback (err, data){
	if (err){
		console.log(err);
		return ;
	}
	console.log(data)
}
//fs.readFile(path, options, callback)

const config = {
	audio_url: fs.readFile(path, options, callback)
}
const run = async () => {
  const transcript = await client.transcripts.create(config)
  console.log(transcript.text)
}

run();
