function setStart(){
    localStorage.setItem("start", document.getElementById("Rnumber").value);
}

function setFinish(){
    localStorage.setItem("finish", document.getElementById("Rnumber2").value);
}

function openNav(){
    document.getElementById("Sidebar").style.width = "250px";
    document.getElementById("main").style.width = "250px";
}
function closeNav() {
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}