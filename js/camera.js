var video = document.querySelector("#videoElement");
	var canvas = document.querySelector("#showscreenshot");
  var container = document.querySelector("#container");
  var img = document.querySelector("#profilePicture");


    async function startCamera(){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let str = await navigator.mediaDevices.getUserMedia({ video: true, audio:false },)
            video.srcObject = str;
        }
    }

    startCamera();
    function stop(e) {
      
	  var stream = video.srcObject;
      var tracks = stream.getTracks();

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }

      video.srcObject = null;
    }
	
	
	function takescreenshot () {
		  canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          let ctx = canvas.getContext("2d");
          
		  ctx.drawImage(video, 0, 0);
		  // Other browsers will fall back to image/png
		  img.src = canvas.toDataURL("image/webp");
          img.setAttribute("style","display:block");
          container.setAttribute("style","display:none")
	};
	function showCam(){
        container.setAttribute("style","display:inline")
    }