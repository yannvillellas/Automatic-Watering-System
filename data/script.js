function onButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "on", true);
    xhttp.send();
}
function offButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "off", true);
    xhttp.send();
}
function timeAutoButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "timeAuto", true);
    xhttp.send();
}
function tempAutoButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "tempAuto", true);
    xhttp.send();
}
setInterval(function getData()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById("tempValue").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "getTemp", true);
    xhttp.send();
}, 10000);