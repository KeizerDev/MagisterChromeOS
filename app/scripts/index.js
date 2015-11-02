'use strict';
$( document ).ready(function() {

    console.log( 'Ready For Action Bitch!' );

    $.get("https://mijn.magister.net/api/schools?filter=" + qry, function(res) {
        console.log(res);
    });
});