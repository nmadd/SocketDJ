app.controller('SongPadCtrl', function($scope, WaveFactory) {
    var socket = io.connect(window.location.href);

    $scope.waves = ['one', 'two', 'three'];
    $scope.sounds = [1,2,3,4,5,6,7,8];
    // $scope.sounds = WaveFactory.waves;

    var socketPlay = function(index){
        socket.emit('songLoad', {index: index});
        WaveFactory.playPause(index);
    }

    $scope.playPause = function(index){
        socketPlay(index);
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

    WebMidi.enable(onSuccess, onFailure);

    function onSuccess() {
        console.log('Outputs', WebMidi.outputs);
        console.log('Inputs', WebMidi.inputs);
        WebMidi.addListener('noteon', function(event){
            console.log(event)
            if(event.note.name === 'C') socketPlay(0);
            if(event.note.name === 'C#') socketPlay(1);
            if(event.note.name === 'D') socketPlay(2);
            if(event.note.name === 'D#') socketPlay(3);
            if(event.note.name === 'E') socketPlay(4);
            if(event.note.name === 'F') socketPlay(5);
            if(event.note.name === 'F#') socketPlay(6);
            if(event.note.name === 'G') socketPlay(7);

        })
        WebMidi.addListener('controlchange', function(event){
            console.log('Control change', event);
        })
    };

    function onFailure(err) {
        console.log("WebMidi could not be enabled.", err);
    };

});

