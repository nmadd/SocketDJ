app.controller('HomeController', function($scope){
	$scope.waves = ['one', 'two', 'three']
	$scope.sounds = ['one', 'two', 'three']



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
	$scope.noLoop = function(){
		// console.log(wavesurfer.regions)
		// wavesurfer.regions[0].update({loop: false});
	}
	$scope.getCurrentTime = function(){
		wavesurfer.on('audioprocess', function(){
			return wavesurfer.getCurrentTime();
		})

	}
	$scope.addRegion = function(){
		waveSurferObjects.forEach(function(sound){
			sound.enableDragSelection({
			loop: true,
			resize: true
		});
		})


		wavesurfer.enableDragSelection({
			loop: true,
			resize: true
		});
	}
})