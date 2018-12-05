const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
// ctx.strokeStyle = '#BADA55'; 預設線條顏色
ctx.strokeStyle = '';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '10';
let isDraw = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let reverse = true;
let topic = ['elephant', 'duck', 'lipstick', 'cup', 'fork', 'swan', 'grape', 'bicycle', 'camera', 'backpack', 'butterfly','telephone'];
let time;

function countDown(i){
  if(i <= -1){
    document.getElementById('draw').classList.add('drawFinish');
    document.getElementById('countDownNotice').innerHTML = 'Draw again?';
    document.getElementById('startBtn').classList.remove('disable');
    document.getElementById('startBtn').disabled = false;
    return;
  }else{
    document.getElementById('countDownNotice').innerHTML = 'Counting...';
    document.getElementById('countDownNum').innerHTML = i;
    setTimeout(() => {
      countDown(i);
    }, 1000);
  }
  i--;
}

function randomTopic (time) {
  let topicCount = topic.length;
  let randomNum = Math.floor(Math.random() * topicCount);
  document.getElementById('draw').classList.remove('drawFinish');
  document.getElementById('startBtn').classList.add('disable');
  document.getElementById('startBtn').disabled = true;
  document.getElementById('topicPrint').innerHTML = topic[randomNum];
  countDown(time);
}

function setColor (color) {
  ctx.strokeStyle = color;
  return ctx.strokeStyle;
}

function draw(e) {
  if (!isDraw) return;
  //- console.log(e);
  // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  //- ctx.lineWidth = hue ;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  //- 以下程式碼的進階寫法
  //- lastX = e.offsetX;
  //- lastY = e.offsetY;

  // hue - give it a rainbow color
  // hue++;

  //- 顏色以及線條反轉
  // if (ctx.lineWidth >= 30 || ctx.lineWidth <= 1) {
  //   reverse = !reverse;
  // }
  // if (reverse) {
  //   ctx.lineWidth++;
  // } else {
  //   ctx.lineWidth--;
  // }
}

function cleanCanvas() {
  document.getElementById('draw').classList.remove('drawFinish');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
  isDraw = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  //- 以現在的座標來更新最後的座標
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDraw = false);
canvas.addEventListener('mouseout', () => isDraw = false);