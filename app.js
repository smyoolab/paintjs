const canvas = document.getElementById("jsCanvas");

function onMouseEnter(event) {
  console.log(event);
}

if (canvas) {
  canvas.addEventListener("mousemove", on, onmousemove);
}
