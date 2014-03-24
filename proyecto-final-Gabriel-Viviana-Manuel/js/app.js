function sketch () {	
	//Global Variables
	var clickX = new Array(),
		clickY = new Array(),
		clickDrag = new Array(),
		paint,
		context,
		canvasCont = $('#canvasDiv'),
		colorRed = '#fc0e0e'
		colorYellow = '#ffe600',
		colorGreen = '#70bf58',
		colorBlue = '#004c94',
		colorWhite = '#ffffff',
		colorBlack = '#000000',
		colorBrown = '#7b5500',
		curColor = colorBlack,
		clickColor = new Array(),
		clickSize = new Array(),
		smallSize = 5,
		mediumSize = 10,
		largeSize = 15,
		curSize = smallSize,
        mouseDown = false,
        loadFlag = false;

	//Definnig Canvas
	canvasCont.append('<canvas width="434px" height="433px" id="canvas"></canvas>');

	canvas = $('#canvas');
	context = canvas.get(0).getContext("2d");
	context.fillStyle = '#ffffff';

	//Events
	canvas.mousedown(function(e){
		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		if(loadFlag){
		  clickX = clickX_ls;
		  clickY = clickY_ls;
		}
		redraw();
	});

	canvas.mousemove(function(e){
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			if(loadFlag){
			  clickX = clickX_ls;
			  clickY = clickY_ls;
			}
			redraw();
		}
	});

	canvas.mouseup(function(e){
		paint = false;
	});

	canvas.mouseleave(function(e){
	var pincel = $('#large');
		if(pincel.hover()){
			// alert('pincel');
		}else{
			paint = false;	
		}
	});

	//color Change Events
	$('#red-paint').on('click',null,colorRed,changeColor);
	$('#yellow-paint').on('click',null,colorYellow,changeColor);
	$('#green-paint').on('click',null,colorGreen,changeColor);
	$('#blue-paint').on('click',null,colorBlue,changeColor);
	$('#white-paint').on('click',null,colorWhite,changeColor);
	$('#black-paint').on('click',null,colorBlack,changeColor);
	$('#brown-paint').on('click',null,colorBrown,changeColor);

	//Brush Size
	$('#small').on('click',null,smallSize,changeSize);
	$('#medium').on('click',null,mediumSize,changeSize);
	$('#large').on('click',null,largeSize,changeSize);

	//brush tracking
	$('#medium').ready(function(){
	    $('#main-content').on('mousemove',function(e){
	    	$('.tool').css({'position':'static','-webkit-transform': 'rotate(-15deg)'});
	    	$('#medium').css({'position': 'relative','left':(e.pageX-864),'top':(e.pageY-783),'-webkit-transform': 'rotate(-65deg)'});
	    });
	});

	$('#small').on('click',function(){
	    $('#main-content').on('mousemove',function(e){
	    	$('.tool').css({'position':'static','-webkit-transform': 'rotate(-15deg)'});
	    	$('#small').css({'position': 'relative','left':(e.pageX-855),'top':(e.pageY-813),'-webkit-transform': 'rotate(-65deg)'});
	    });
	});
	$('#medium').on('click',function(){
	    $('#main-content').on('mousemove',function(e){
	    	$('.tool').css({'position':'static','-webkit-transform': 'rotate(-15deg)'});
	    	$('#medium').css({'position': 'relative','left':(e.pageX-864),'top':(e.pageY-783),'-webkit-transform': 'rotate(-65deg)'});
	    });
	});
	$('#large').on('click',function(){
	    $('#main-content').on('mousemove',function(e){
	    	$('.tool').css({'position':'static','-webkit-transform': 'rotate(-15deg)'});
	    	$('#large').css({'position': 'relative','left':(e.pageX-854),'top':(e.pageY-753),'-webkit-transform': 'rotate(-65deg)'});
	    });
	});
	$('#eraserCanvas').on('click',function(){
	    $('#main-content').on('mousemove',null,'#eraserCanvas',trakingPincel);
	});


	//Clear Canvas
	$('#new-1').on('click',clearCanvas);

	//Save Canvas
	$('#save-1').on('click',saveCanvas);

	//Load Canvas
	$('#load-1').on('click',loadCanvas);

	//Eraser Canvas
	$('#eraserCanvas').on('click',null,colorWhite,changeColor);

	//Download
	document.getElementById('download').addEventListener('click', function(e) {
	    document.getElementById('download').href=canvas.get(0).toDataURL('image/jpg');
	    // document.getElementById('download-1').download=myImage.png;
	}, false);

	//Functions
	function addClick(x, y, dragging) {
		// if(loadFlag){
		// 	 for (var i=0,l=clickX_ls.length;i<l;i++){
		// 		clickX.push(clickX_ls[i]);
		// 		console.log(clickX);
		// 	}
		// 	for (var i=0,l=clickY_ls.length;i<l;i++){
		// 		clickY.push(clickY_ls[i]);
		// 	} 
		// }
	  	clickX.push(x);
	  	clickY.push(y);
	  	clickDrag.push(dragging);
	  	clickColor.push(curColor);
	  	clickSize.push(curSize);
	  	loadFlag = false;
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
	  loadFlag=false;
	}
	
	function changeColor (e){
	  curColor = e.data;
	}

	function changeSize (e){
	  curSize = e.data;
	}

	function clearCanvas() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		clickX = [];
		clickY = [];
		clickColor = [];
		clickSize = [];
		clickDrag = [];
    }

	//Save Canvas on local storage
	function saveCanvas() {
  		window.localStorage.canvasImage = canvas.get(0).toDataURL();
  		window.localStorage.setItem( "array_x", JSON.stringify(clickX));
  		window.localStorage.setItem( "array_y", JSON.stringify(clickY));
  	}

  	//Load canvas from local storage
  	function loadCanvas() {
  		var img = new Image(); // The canvas drawImage() method expects an image object.
        img.src = window.localStorage.canvasImage; // Retrieve the last saved artistic achievement from persistent local storage.
        img.onload = function() { // Only render the saved drawing when the image object has fully loaded the drawing into memory.
        	context.drawImage(img, 0, 0); // Draw the image starting at canvas coordinate (0, 0) - the upper left-hand corner of the canvas.
  		} // onload
  		clickX_ls = JSON.parse(window.localStorage.getItem("array_x"));      //Converts string to array.
      	clickY_ls = JSON.parse(window.localStorage.getItem("array_y"));      //Converts string to array.

		// console.log(clickX);
		// console.log(clickY);
		loadFlag = true;   
  	} 


	//Pincel traking
	
	// $('#large').on('click',function(){
	//     $('#main-content').on('mousemove',trakingPincel);
	// });
	// function trakingPincel (e) {
	//   var pincel = $(e.data);
	//   // console.log(e.pageX -1000 );
	//   pincel.css({'position': 'relative','left':(e.pageX-854),'top':(e.pageY-753),'-webkit-transform': 'rotate(-65deg)'});
	//   // console.log(e.pageX - this.offsetLeft); 
	//   // console.log (e.pageY - this.offsetTop);
	// }
}
sketch();
