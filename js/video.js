function show(){
    const params = new URLSearchParams(window.location.search)
    var videoUrl = params.get("url");
    videoTitle = params.get("title");
    var source =`<source src="${videoUrl}" type="video/mp4">`
    var title = videoTitle
    $("#myvideo").append(source)
    $(".title").append(title)
}
show()



var calcRate = [];
//localStorage.setItem("totalRate", []);

$("#rate1").click(function(){
    $("#rate1").css("color","#c0a012e1")
    calcRate.push(1)
})

$("#rate2").click(function(){
    $("#rate1").css("color","#c0a012e1")
    $("#rate2").css("color","#c0a012e1")
    calcRate.push(2)
})

$("#rate3").click(function(){
    $("#rate1").css("color","#c0a012e1")
    $("#rate2").css("color","#c0a012e1")
    $("#rate3").css("color","#c0a012e1")
    calcRate.push(3)
})

$("#rate4").click(function(){
    $("#rate1").css("color","#c0a012e1")
    $("#rate2").css("color","#c0a012e1")
    $("#rate3").css("color","#c0a012e1")
    $("#rate4").css("color","#c0a012e1")
    calcRate.push(4)
})

$("#rate5").click(function(){
    $("#rate1").css("color","#c0a012e1")
    $("#rate2").css("color","#c0a012e1")
    $("#rate3").css("color","#c0a012e1")
    $("#rate4").css("color","#c0a012e1")
    $("#rate5").css("color","#c0a012e1")
    calcRate.push(5)
})

function sumRate(){
var sumRate = calcRate.reduce(function(a, b){
    return a + b;
}, 0)}

