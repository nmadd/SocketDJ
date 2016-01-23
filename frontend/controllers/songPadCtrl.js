app.controller('SongPadCtrl', function($scope, WaveFactory) {
    var socket = io.connect(window.location.href);



    // window.location.href

    $scope.waves = ['one', 'two', 'three']
    $scope.sounds = ['one', 'two', 'three']

    var waveState = true;
    $scope.getWaveState = function() {
        return waveState;
    }
    $scope.showHideWave = function() {
        if (waveState === false) waveState = true;
        else waveState = false;
    }
    $scope.isZoomed = false;
    $scope.playPause = function(index){
        socket.emit('test', {index: index});
        WaveFactory.playPause(index);
    }

    socket.on('test2', function(data){
        console.log('ready to play', data)
        WaveFactory.playPause(data.index);
    })


    $scope.zoom = function(num) {
        WaveFactory.toggleZoom(num, $scope.isZoomed)
        $scope.isZoomed = !$scope.isZoomed;
    };

});

