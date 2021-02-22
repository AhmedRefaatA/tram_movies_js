async function addvideo(){
    let token =  sessionStorage.getItem("Token");
    let  name = document.getElementById('name')
    let  url = document.getElementById('url')
    let poster = document.getElementById('image')

    
    var myHeaders = new Headers();
    myHeaders.append("token", `${token}`);
    myHeaders.append('Content-Type','application/json')

    var raw = {title:name.value, url:url.value,poster:poster.value};

    fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/", {
        method: 'POST',
        headers: myHeaders,
        body:JSON.stringify(raw)
    })
    .then(response => response.json())
    .then(result => console.log(result['data']))
    .catch(error => console.log('error', error));
}
