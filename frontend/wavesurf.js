WebMidi.enable(onSuccess, onFailure);


 
function onSuccess() {
    console.log('Outputs', WebMidi.outputs);
    console.log('Inputs', WebMidi.inputs);
    WebMidi.addListener('noteon', function(event){
    	console.log(event);
    	if(event.note.name === 'C') waveSurferObjects[0].playPause();
    	if(event.note.name === 'C#') waveSurferObjects[1].playPause();
    	if(event.note.name === 'D') waveSurferObjects[2].playPause();
		
	})
	WebMidi.addListener('programchange', function(event){
		console.log('program changed');
	})
	WebMidi.addListener('channelmode', function(event){
		console.log('channel mode');
	})
}
 
function onFailure(err) {
    console.log("WebMidi could not be enabled.", err);
}

var waveSurferSounds = ['/dangerous.mp3'];

var waveSurferObjects = [];
