app.factory('WaveFactory', function($http) {
    var factory = {};
    var wavesCount = 0;
    var searchResults;
    var waveSurferObjects = [];

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
    	console.log('SEARCH QUERY', query)
    	return $http({
                method: "GET",
                url: ' https://api.spotify.com/v1/search',
                params: {
					q: query,
					type: 'track',
					limit: 5
				}
            })
    		.then(function(response){
    			searchResults = response.data.tracks.items;
    		})
    }

    factory.getSearchResults = function(){
    	return searchResults;
    }

    factory.resetSearchResults = function(){
    	searchResults = '';
    }

    factory.addSong = function(song) {
    	var songUrl = song.preview_url;

    	// waveSurferSounds.push(songUrl);
        factory.createWave(wavesCount, songUrl);
        wavesCount++;
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
            loop: false,
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

        newWave.on('ready', function () {
            var timeline = Object.create(WaveSurfer.Timeline);

            timeline.init({
                wavesurfer: newWave,
                container: "#wave-timeline" + num
            });
        });

        waveSurferObjects.push(newWave)

    }



    factory.getWaveCount = function() {
        return wavesCount + 1;
    }

    factory.toggleZoom = function(num, isZoomed) {
        if (isZoomed) {
            waveSurferObjects[num].zoom(-50);
        } else {
            waveSurferObjects[num].zoom(50);
        }
    };

    factory.filterKeys = ['biquad' /*, 'reverb', 'delay'*/];

    factory.setFilter = function (num, key) {
        var surfer = waveSurferObjects[num];
        console.log(surfer.backend.ac);
        var filters = {
            biquad : function() {
                var lowpass = surfer.backend.ac.createBiquadFilter();
                surfer.backend.setFilter(lowpass);
            },
            //These filters arent working right now
            // reverb : function() {
            //     var reverb = surfer.backend.ac.createConvolver();
            //     surfer.backend.setFilter(reverb);
            // },
            // delay : function() {
            //     var delay = surfer.backend.ac.createDelay(0.5);
            //     surfer.backend.setFilter(delay);
            // }
        }
        if (!filters[key]) return;
        filters[key]();
    }

    return factory;
})

