
// var wavesurfer = WaveSurfer.create({
//     container: document.querySelector('#wave'),
//     waveColor: 'violet',
//     progressColor: 'purple'
// });

var waveSurferSounds = ['/dangerous.mp3', '/greatestView.m4a', '/dangerous.mp3', '/dangerous.mp3'];

var waveSurferObjects = [];

waveSurferSounds.forEach(function(sound, index){
	// var newWave = {name: 'wave' + index, sound: null}
	var newWave = Object.create(WaveSurfer);
	document.addEventListener('DOMContentLoaded', function () {

	    var options = {
	        container     : document.querySelector('#wave' + index),
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
			loop: false,
			resize: true
		});
		//initialize start and end
		newWave.regionData = {
			start : null,
			end : null
		}
		newWave.isPlaying = false;
		newWave.isZoomed = false;
	    newWave.on('region-created', function(region) {
	    	newWave.regionData = region;
	    	newWave.regionData.domId = "wave" + index;
	    });
	    waveSurferObjects.push(newWave);

	});

})



// var wavesurfer = Object.create(WaveSurfer);

// var wavesurfer2 = Object.create(WaveSurfer);

// wavesurfer.on('mouseup', function(MouseEvent){
// 	console.log('mousing')
// })

// document.addEventListener('DOMContentLoaded', function () {
//     var options = {
//         container     : document.querySelector('#wave'),
//         waveColor     : 'violet',
//         progressColor : 'purple',
//         cursorColor   : 'navy',
//         interact: true
//     };

//     var options2 = {
//         container     : document.querySelector('#wave1'),
//         waveColor     : 'violet',
//         progressColor : 'purple',
//         cursorColor   : 'navy',
//         interact: true
//     };

//     // if (location.search.match('scroll')) {
//     //     options.minPxPerSec = 100;
//     //     options.scrollParent = true;
//     // }

//     // Init
//     wavesurfer.init(options);
//     // Load audio from URL
//     wavesurfer.load('/dangerous.mp3');

//     // Init
//     wavesurfer2.init(options2);
//     // Load audio from URL
//     wavesurfer2.load('/greatestView.m4a');

//     // Regions
//     // if (wavesurfer.enableDragSelection) {
//     //     wavesurfer.enableDragSelection({
//     //         color: 'rgba(0, 255, 0, 0.1)'
//     //     });
//     // }
// });

// console.log('WAVE', wavesurfer)

// wavesurfer.on('ready', function () {
//     wavesurfer.play();
// });

// wavesurfer.load('dangerous.mp');