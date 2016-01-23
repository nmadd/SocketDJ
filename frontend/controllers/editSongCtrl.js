app.controller('EditSongCtrl', function($scope, WaveFactory) {
    $scope.searchForSongs = WaveFactory.searchForSongs;
    $scope.searchResults = WaveFactory.getSearchResults;
    /*We need an existing container for each wave..
    but we dont want to see it before a song has been added. So
    I place an ng-show on each div which maps to the boolean in the
    showContainers array. When a new song is added, I switch the value
    at that index to true and push another false to hide the next
    container.*/
    $scope.showContainers = [false];
    $scope.waves = function() {
        var count = WaveFactory.getWaveCount();
        return new Array(count);
    }

    $scope.addSong = function(song) {
        var index = $scope.showContainers.length;
        $scope.showContainers[index - 1] = true;
        $scope.showContainers.push(false);
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
    $scope.setFilter = WaveFactory.setFilter;
});
