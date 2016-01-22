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
                controller: "EditSongCtrl"
            });

        $urlRouterProvider.otherwise("/");

    });
