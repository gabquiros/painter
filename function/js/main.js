//Global Variables

var clickX = new Array(),
	clickY = new Array(),
	clickDrag = new Array(),
	paint,
	context,
	canvasDiv = document.getElementById('canvasDiv'),
  colorPurple = "#cb3594",
  colorGreen = /*"#659b41"*/"rgba(122,185,0,0.2)",
  colorYellow = "#ffcf33",
  colorBrown = "#986928",
  curColor = colorPurple,
  clickColor = new Array();
  clickSize = new Array(),
  curSize = 5;



//Definnig Canvas
canvas = document.createElement('canvas');
canvas.setAttribute('width', 300);
canvas.setAttribute('height', 200);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
// if(typeof G_vmlCanvasManager != 'undefined') {
// 	canvas = G_vmlCanvasManager.initElement(canvas);
// }
context = canvas.getContext("2d");

var canVas = $('#canvas');

//Events
canVas.mousedown(function(e){
	console.log(e);
  // var mouseX = e.pageX - this.offsetLeft;
  // var mouseY = e.pageY - this.offsetTop;

		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
canVas.mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});
canVas.mouseup(function(e){
  paint = false;
  // clickY = [];
  // clickX = [];
});
canVas.mouseleave(function(e){
  var pincel = $('#pincel');
  if(pincel.hover()){

  }else{
    paint = false;
  }
});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  // context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  // context.lineWidth = curSize;
			
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      // console.log(clickDrag[i]);
      // console.log(clickX[i]);
      // console.log(clickY[i]);
      // console.log(clickColor[i]);
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.lineWidth = clickSize[i];
     context.stroke();
  }
}
$('#color-green').on('click',function(){
  curColor = colorGreen;
});
$('#color-purp').on('click',function(){
  curColor = colorPurple;
});
$('#color-brown').on('click',function(){
  curColor = colorBrown;
});
$('#color-yellow').on('click',function(){
  curColor = colorYellow;
});
$('#size-1').on('click',function(){
  curSize = 5;
});
$('#size-2').on('click',function(){
  curSize = 10;
});
$('#size-3').on('click',function(){
  curSize = 20;
});
function changeColor (color){
  curColor = color;
}

//Pincel traking


document.getElementById('download').addEventListener('click', function(e) {
    document.getElementById('download').href=canvas.toDataURL('image/png');
    // document.getElementById('download').download=myImage.png;
}, false);


$('#pincel').on('click',function(){
    $('#container').on('mousemove',trakingPincel);
});
function trakingPincel (e) {
  var pincel = $('#pincel');
  console.log(e.pageX + 10 );
  pincel.css({'left':(e.pageX+10),'top':(e.pageY-220)});
  // console.log(e.pageX - this.offsetLeft); 
  // console.log (e.pageY - this.offsetTop);
}

///////////////////////////////////////////////

// function setCanvas () {
//  var clickX = new Array(),
//    clickY = new Array(),
//    clickDrag = new Array(),
//    paint,
//    context,
//    canvasCont = $('#canvasDiv'),
//    colorPurple = "#cb3594",
//    colorGreen = /*"#659b41"*/"rgba(122,185,0,0.2)",
//    colorYellow = "#ffcf33",
//    colorBrown = "#986928",
//    curColor = colorPurple,
//    clickColor = new Array();
//    clickSize = new Array(),
//    curSize = 5;

//  //Definnig Canvas
//  canvasCont.append('<canvas width="434px" height="433px" id="canvas"></canvas>');
//  canvas = $('#canvas');
//  context = canvas.get(0).getContext("2d");

//  //Events
//  canvas.mousedown(function(e){
//      alert('hola');
//    // console.log(e);
//    //  var mouseX = e.pageX - this.offsetLeft;
//    //  var mouseY = e.pageY - this.offsetTop;

    
//    //  paint = true;
//    //  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//    //  redraw();
//  });
// }

// setCanvas();
