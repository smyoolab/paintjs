const canvas = document.getElementById("jsCanvas"); // 캔버스 객체 선언
const ctx = canvas.getContext("2d"); // 캔버스에서 context를 2D concept으로 셋팅
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;

//canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth; // 렌더링하기 위한 캔버스의 범위 width 셋팅
//canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight; // 렌더링하기 위한 캔버스의 범위 height 셋팅
canvas.width = CANVAS_SIZE; // 렌더링하기 위한 캔버스의 범위 width 셋팅
canvas.height = CANVAS_SIZE; // 렌더링하기 위한 캔버스의 범위 height 셋팅

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR; // 렌더링하는 선의 color 지정
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 렌더링하는 선의 두께 PIXEL지정

let painting = false; // Painting 가능 여부
let filling = false;

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

// 캔버스 내에서 마우스가 클릭되어 move될 경우 line 렌더링
function onMouseMove(event) {
  //console.log(event);
  const x = event.offsetX; // 캔버스 내에서의 마우스 x 좌표
  const y = event.offsetY; // 캔버스 내에서의 마우스 y 좌표

  // 선이 그려지기 위한 경로를 생성
  if (!painting) {
    ctx.beginPath(); // path(선) 객체를 생성(시작)
    ctx.moveTo(x, y); // path 시작 좌표 생성

    // 생성된 경로에 선을 그린다
  } else {
    ctx.lineTo(x, y); // path 종료 좌표 생성
    ctx.stroke(); // path 시작좌표로 부터 종료 좌표 까지 line 생성
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  console.log(event);
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
