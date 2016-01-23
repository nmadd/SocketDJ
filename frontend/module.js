var app = angular.module('App', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        //turn of hashbangs
        $locationProvider.html5Mode(true);

        $stateProvider
            .state("songPad", {
                url: "/",
                templateUrl: "templates/songpad.html",
                controller: "SongPadCtrl"
            })
            .state("editSong", {
                url: "/editsong",
                templateUrl: "templates/editsong.html",
                controller: "EditSongCtrl",
                resolve: {
                    theWave: function(WaveFactory){
                        WaveFactory.getWaveSurferObjects().forEach(function(wave, index){
                            var options = {
                                container: document.querySelector('#wave' + index),
                                waveColor: 'violet',
                                progressColor: 'purple',
                                cursorColor: 'navy',
                                interact: true
                            };
                            var audio = wave.audio;
                            console.log(audio)
                            wave.destroy()
                            // wave.init(options)
                            // WaveFactory.createWave(index, audio, redraw);
                        })
                    }
                }
            });

        $urlRouterProvider.otherwise("/");

    });
