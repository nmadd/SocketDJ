app.controller('HomeController', function($scope, WaveFactory){
	$scope.waves = ['one', 'two', 'three']
	$scope.sounds = ['one', 'two', 'three']

	$scope.addSong = function(){
		WaveFactory.addSong();
	}


	var waveState = true;
	$scope.getWaveState = function(){
		return waveState;
	}
	$scope.showHideWave =function(){
		if(waveState === false) waveState = true;
		else waveState = false;
	}
	$scope.playPause = function(num){
		waveSurferObjects[num].playPause();
	}
	$scope.play = function(){
		console.log(wavesurfer2);
		wavesurfer2.playPause();
	}
	$scope.zoom = function(num){
		waveSurferObjects.forEach(function(sound){
			sound.zoom(num);
		})
	}
})