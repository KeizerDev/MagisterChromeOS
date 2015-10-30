var xhr = new XMLHttpRequest();
xhr.open("GET", "https://mijn.magister.net/api/schools?filter=farel", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // JSON.parse does not evaluate the attacker's scripts.
    var text = document.createElement("div");
    text.innerHTML = JSON.stringify(JSON.parse(xhr.responseText));
    document.body.appendChild(text);
  }
}
xhr.send();