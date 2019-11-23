
function removeElement(currQ) {
var element = document.getElementById("question0");
element.classList.add("remove1");
element.addEventListener("animationend", function () {document.getElementById("question0").remove();}); 
//element.remove();
console.log("RemoveElement got called");

}