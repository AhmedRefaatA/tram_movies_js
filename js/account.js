$(function(){
    $("#edit ").click (function ()
    {
      $("input").removeAttr("disabled");
      $("#save").removeAttr("disabled");
      $(".icon").removeAttr("disabled");
      startCamera();
    });
    $("#save").click (function (){
      $("input").attr("disabled","disabled");
             stop();  
       $(".icon").attr("disabled","disabled");
       /*$("#imageUpload").css("display" , "none");*/
      });
      $("#open").click (function ()
      {
      $("#imageUpload").removeAttr("style");
      });
  /*
         $("#close_vid").click (function (){
   $("#videoElement").css("visibility","hidden");        
                });*/
  });

  

