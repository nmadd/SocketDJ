app.controller('SongPadCtrl', function($scope, WaveFactory) {
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
    $scope.playPause = WaveFactory.playPause;

    $scope.zoom = function(num) {
        WaveFactory.toggleZoom(num, $scope.isZoomed)
        $scope.isZoomed = !$scope.isZoomed;
    };

    $scope.addSong = WaveFactory.addSong;
});

