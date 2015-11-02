'use strict';
$( document ).ready(function() {

    console.log( 'ready!' );

    function searchSchool(qry) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://mijn.magister.net/api/schools?filter=' + qry, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            console.log(xhr.responseText);
            var resp = JSON.parse(xhr.responseText);
            var text = document.createElement('div');
            text.innerHTML = JSON.stringify(resp);
            document.body.appendChild(text);
          }
        };
        xhr.send();
    }
});