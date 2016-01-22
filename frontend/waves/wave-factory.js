app.factory('WaveFactory', function($http){
	var factory = {};
	var wavesCount = 0;


	factory.addSong = function(){
		return $http({
		method: "GET",
		url: ' https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem'
		})
		.then(function(response){
			var songUrl = response.data.preview_url;
			console.log('Spotify song', songUrl)
			waveSurferSounds.push(songUrl);
			factory.createWave(wavesCount, songUrl);
			wavesCount++;
		})
	}

	factory.createWave = function(num, sound){

	var newWave = Object.create(WaveSurfer);


	    var options = {
	        container     : document.querySelector('#wave' + num),
	        waveColor     : 'violet',
	        progressColor : 'purple',
	        cursorColor   : 'navy',
	        interact: true
	    };

	    // Init
	    newWave.init(options);
	    // Load audio from URL
	    newWave.load(sound);

	    newWave.enableDragSelection({
			loop: true,
			resize: true
		});

	    waveSurferObjects.push(newWave);


	}

	factory.getWaveCount = function(){
		return wavesCount;
	}




	return factory;
})