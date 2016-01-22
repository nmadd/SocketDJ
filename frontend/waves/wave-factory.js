app.factory('WaveFactory', function($http) {
    var factory = {};
    var wavesCount = 0;
    var searchResults;

    factory.playPause = function(num) {
        if (waveSurferObjects[num].isPlaying) {
            waveSurferObjects[num].pause();
            waveSurferObjects[num].isPlaying = false;
        } else {
            var start = waveSurferObjects[num].regionData.start,
                end = waveSurferObjects[num].regionData.end;
            if (start && end) {
                waveSurferObjects[num].play(start, end);
            } else {
                waveSurferObjects[num].play();
            }
            waveSurferObjects[num].isPlaying = true;
        }
    };

    factory.searchForSongs = function(query){
    	return $http({
                method: "GET",
                url: ' https://api.spotify.com/v1/search',
                params: {
					q: query, 
					type: 'track', 
					limit: 25
				}
            })
    		.then(function(response){
    			searchResults = response.data;
    		})
    }

    factory.getSearchResults = function(){
    	return searchResults;
    }

    factory.addSong = function(song) {
    	var songUrl = '';

    	waveSurferSounds.push(songUrl);
        factory.createWave(wavesCount, songUrl);
        wavesCount++;

        // return $http({
        //         method: "GET",
        //         url: ' https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem'
        //     })
        //     .then(function(response) {
        //         var songUrl = response.data.preview_url;
        //         console.log('Spotify song', songUrl)
        //         waveSurferSounds.push(songUrl);
        //         factory.createWave(wavesCount, songUrl);
        //         wavesCount++;
        //     })
    };

    factory.createWave = function(num, sound) {

        var newWave = Object.create(WaveSurfer);


        var options = {
            container: document.querySelector('#wave' + num),
            waveColor: 'violet',
            progressColor: 'purple',
            cursorColor: 'navy',
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
        //initialize start and end
        newWave.regionData = {
            start: null,
            end: null
        }
        newWave.isPlaying = false;
        newWave.isZoomed = false;
        newWave.on('region-created', function(region) {
            newWave.regionData = region;
            newWave.regionData.domId = "wave" + wavesCount;
        });
        waveSurferObjects.push(newWave);


    }

    factory.getWaveCount = function() {
        return wavesCount;
    }

    factory.toggleZoom = function(num, isZoomed) {
        if (isZoomed) {
            waveSurferObjects[num].zoom(-50);
        } else {
            waveSurferObjects[num].zoom(50);
        }
    };

    return factory;
})

