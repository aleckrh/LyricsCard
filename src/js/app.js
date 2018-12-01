/*
=========================================================
* LyricsCard - v1.0.0
=========================================================
* Copyright 2018 Alejandro RH

* Main Coded by Alejandro RH
=========================================================
*/

'use strict';

$('#preview').click(function () {
    var lyrics = $('#lyrics').val();
    var song = $('#song').val();
    var artist = $('#artist').val();
    if (!lyrics || !song || !artist) {
        alert('Please, complete the fields');
    } else {
        var myLineBreak = lyrics.replace(/\r?\n/g, '<br />');
        $('#lyrics-out').html(myLineBreak);
        $('#song-out').text(song);
        $('#artist-out').text(artist);
        console.log('Preview created');
    }
});

$('#createCard').click(function () {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        $('#lyrics-card').html(canvas);
    });
    console.log('Card created successfully');
});