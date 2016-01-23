app.controller('EditSongCtrl', function($scope, WaveFactory) {
    $scope.searchForSongs = WaveFactory.searchForSongs;
    $scope.searchResults = WaveFactory.getSearchResults;



    $scope.waves = function() {
        return new Array(WaveFactory.getWaveCount());
    }


    $scope.addSong = function(song) {
        WaveFactory.addSong(song);
        WaveFactory.resetSearchResults();
    }


    var waveState = true;
    $scope.getWaveState = function() {
        return waveState;
    }
    $scope.isZoomed = false;
    $scope.playPause = WaveFactory.playPause;

    $scope.zoom = function(num) {
        WaveFactory.toggleZoom(num, $scope.isZoomed)
        $scope.isZoomed = !$scope.isZoomed;
    };
    $scope.filters = WaveFactory.filterKeys;
    $scope.addSong = WaveFactory.addSong;
    $scope.setFilter = WaveFactory.setFilter;
});
