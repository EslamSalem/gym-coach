const mainElement = document.querySelector("main");

const mainClientHeight = mainElement.clientHeight;
const mainScrollHeight = mainElement.scrollHeight;

const mainOffsetHeight = mainElement.offsetHeight;

function calcMainHeight() {  //To position footer at the bottom of the page
  if (mainOffsetHeight <= (window.innerHeight)) {
    mainElement.style.height = "calc(100vh - 4.5rem)";
  } else {
    mainElement.style.height = "auto";
  }
}

calcMainHeight();

window.addEventListener("resize", calcMainHeight);