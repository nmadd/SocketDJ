app.factory('WaveFactory', function() {

    var factory = {
        playPause: function(num) {
            if (waveSurferObjects[num].isPlaying) {
                waveSurferObjects[num].pause();
                waveSurferObjects[num].isPlaying = false;
            } else {
                var start = waveSurferObjects[num].regionData.start,
                    end = waveSurferObjects[num].regionData.end;
                if (start && end) {
                    waveSurferObjects[num].play(start, end);
                } else {
                    waveSurferObjects[num].play();
                }
                waveSurferObjects[num].isPlaying = true;
            }
        },

        toggleZoom: function(num, isZoomed) {
            if (isZoomed) {
                waveSurferObjects[num].zoom(-50);
            } else {
                waveSurferObjects[num].zoom(50);
            }
        },


    };

    return factory;
})

/*
{
    container : {
        id: "wave0",
    },
    regions : {
        list : {
            wavesurfer_8lj4968 : {
                start : xxx,
                end: xxx,
                id: xxx
            }
        }
    }
}
*/
