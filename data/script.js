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
function valveButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "valve", true);
    xhttp.send();
}
function tankButton() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "tank", true);
    xhttp.send();
}
setInterval(function getData()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById("stateValve").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "readValve", true);
    xhttp.send();
}, 2000);
setInterval(function getData()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            document.getElementById("stateTank").innerHTML = this.responseText;  
        }
    };
    xhttp.open("GET", "readTank", true);
    xhttp.send();
}, 2000);
