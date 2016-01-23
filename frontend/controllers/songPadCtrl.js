app.controller('SongPadCtrl', function($scope, WaveFactory) {
    var socket = io.connect(window.location.href);

    $scope.waves = ['one', 'two', 'three']
    $scope.sounds = ['one', 'two', 'three']

    $scope.playPause = function(index){
        socket.emit('songLoad', {index: index});
        WaveFactory.playPause(index);
    }

    socket.on('songPlay', function(data){
        WaveFactory.playPause(data.index);
    })

    var waveState = true;
    $scope.getWaveState = function() {
        return waveState;
    }
    $scope.showHideWave = function() {
        if (waveState === false) waveState = true;
        else waveState = false;
    }
    $scope.isZoomed = false;
    

    $scope.zoom = function(num) {
        WaveFactory.toggleZoom(num, $scope.isZoomed)
        $scope.isZoomed = !$scope.isZoomed;
    };

});

