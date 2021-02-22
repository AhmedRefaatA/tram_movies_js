//Button Scroll 
scroll = $(".fa-arrow-circle-up");
scroll.click(function() {
    $("html,body").animate({ scrollTop: 0 }, 2000);
});

function getVideo(){
    var myHeaders = new Headers();
    myHeaders.append("token", "cee6d812-ef89-4641-83b9-1faeb5043160");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/", requestOptions)
    .then(response => response.json())
    .then(result => {

        for(const prop in result){
            var show = `
            <div class="col-sm-3 details-cont p-2">
                <div class="overlay">
                    <div class="row title col-sm-12">${result[prop].title}</div>
                    <div class="row rate">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <a href="./videoplayer1.html?url=${result[prop].url}&title=${result[prop].title}" target="_blank" onclick="playVideo(event)"><i class="fas fa-play-circle"  id=${result[prop].id}></i></a>
                    </div>
                </div>
                <img src="${result[prop].poster}">
            </div>
            `
            var showSlid = `
                            <a class="rvs-nav-item">
                                <span class="rvs-nav-item-thumb" style="background-image: url(${result[prop].poster})"></span>
                                <h4 class="rvs-nav-item-title">${result[prop].title}</h4>
                                <small class="rvs-nav-item-credits">Watch on TRAM</small>
                            </a>
                            `
            $("#rvs-nav-stage").append(showSlid);
            $("#pag").append(show);
        }
    })
    .catch(error => console.log('error', error));
     
};
getVideo();
function playVideo(e){
    var idNum = e.path[0].id;
    console.log(idNum);
    var myHeaders = new Headers();
    myHeaders.append("token", "cee6d812-ef89-4641-83b9-1faeb5043160");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/${idNum}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        }
    )
    .catch(error => console.log('error', error));
}
