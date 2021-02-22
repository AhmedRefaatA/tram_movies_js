    // Alert Close Btn
    $('.close').click(function(){
        $('#alert').fadeOut();
    });

    // Stop Browser From Go Back 
    function notGoBack(){
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
      history.go(1);
      };
    }
    // Check On Submit
let token;
  
async function checkAdmin(){
  let admin_name = document.getElementById('admin_name')
  let admin_password = document.getElementById('admin_password')

  let loginObj = {username:(admin_name.value),password:(admin_password.value)};
  let htResponse = await fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/login",{
    method : 'POST',
    headers:{
    "content-type":"application/json"},
    body:JSON.stringify(loginObj)
  })
  let jsonObj = await htResponse.json();
  const token = jsonObj.token
  if(jsonObj.token){
    sessionStorage.setItem('Token', token);
    window.location.href = ('Edit_Movies.html') 
    console.log(jsonObj)
    valid = true   
    }else{
    $('#adminAlertMsg').text(jsonObj.error)
    $('#alert').fadeIn();
    valid = false;
  }
    return valid;
}
 
  async function showMovies(){
     notGoBack()

    let tok =  sessionStorage.getItem("Token");
    var myHeaders = new Headers();
    myHeaders.append("token", `${tok}`);
      
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
      
    let htResponse = await fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/", requestOptions)
    let movies = await htResponse.json();
    sessionStorage.setItem('Movies',movies)
    // console.log(movies)

    $('#showMovies').text('')
    
    for(let i = 0; i < movies.length; i++ ){
        $('#showMovies').append(
            `<tr id = ${movies[i].id} style="display:block class="Data"">`+
            '<td>'+ `${movies[i].id}`+'</td>'+
            '<td>'+ `${movies[i].name}`+'</td>'+
            `<td><a href=${movies[i].url}></a></td>`+

            `<td> <button class="btn btn-primary data-toggle="modal" data-target="#confirm-delete" onclick = del(${(movies[i].id)})>  Delete </button></td>`+
            `<td> <button class="btn btn-primary" onclick = edit(${movies[i].id})>  Edit </button></td></tr>` 

             +

            `<tr id = ${movies[i].id} style='display:none' class="insertData">`+
            // `<td> <input name='newID' type="text" value= ${movies[i].id} style="width:40px"></td>`+
            '<td>'+ `${movies[i].id}`+'</td>'+
            `<td> <input name='newName' type="text" value="${movies[i].name}"></td>`+
            // `<td> <input name='newRating' type="text" value=${movies[i].rating} style="width:40px"></td>`+
            `<td> <input name='newUrl' type="text" value=${movies[i].url}></td>`+
            `<td> <button  class="btn btn-primary" onclick = "save(${(movies[i].id)})">  Save </button></td>`+
            `<td> <button  class="btn btn-primary" onclick = "cancel(${(movies[i].id)})">  Cancel </button></td>`
            )}
            window.history.forward();
          }
      

    // Delete Movie

    async function del(id){
        var myHeaders = new Headers();
        let token =  sessionStorage.getItem("Token");

         myHeaders.append("token", `${token}`);

         const movies =  sessionStorage.getItem("Movies");
      
        var requestOptions = {
        method: 'Delete',
        headers: myHeaders,
        redirect: 'follow'
        };
      
        let htResponse = await fetch(`https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/${id}`, requestOptions)
        let jsonObj = await htResponse.json();
        console.log(jsonObj)

        
      if(jsonObj.error){
        console.log(jsonObj.error)
      }
      else{
        document.getElementById(`${id}`)
        $(`#${id}`).remove();
      }
    }

    
    // // Edit Movie Info
    function edit(id){
        $(`#${id}`).hide();
        $(`#${id}.insertData`).show();

    }

    function cancel(id){
      $(`#${id}`).show();
      $(`#${id}.insertData`).hide();

  }

      // Save New Info
   async function save(id){

    //  console.log(row)
    let newName = $(`#${id}.insertData`).find("input")[0]
    let newUrl = $(`#${id}.insertData`).find('input')[1]


      var raw = {
        name:newName.value,
        url: newUrl.value
      }
      
      var myHeaders = new Headers();
      myHeaders.append('Content-Type','application/json')

      let token = sessionStorage.getItem('Token')
      myHeaders.append("token", token );


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'    
      }
      
      // console.log(requestOptions)

          let htResponse = await fetch(`https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/videos/${id}`, requestOptions);
          let jsonObj = await htResponse.json();
          console.log(jsonObj)
          showMovies()
      }


      // Log Out Admin
  async function logOut(){

    let token = sessionStorage.getItem('Token')
    var myHeaders = new Headers();
    myHeaders.append("token", `${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let htResponse = await fetch(`https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/logout`, requestOptions);
    let jsonObj = await htResponse.json();  
    console.log(jsonObj)    
      window.location.href= ('./index.html')

  }


