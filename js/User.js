// User Section

// 1- Home Page

// To Close Sign in Alert 
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

// Check User Login
async function loginCheck(){

    let usr = document.getElementById('usr')
    let pwd = document.getElementById('pwd')


    let loginObj = {username : (usr.value) , password : (pwd.value)}
    let htResponse = await fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/login",{
      method : 'POST',
      headers:{
        "content-type":"application/json"},
      body:JSON.stringify(loginObj)
    })
    let jsonObj = await htResponse.json();
    if(jsonObj.token){
        sessionStorage.setItem('Name',usr.value)
        sessionStorage.setItem('Password',pwd.value)
        sessionStorage.setItem('Token', jsonObj.token)
        sessionStorage.setItem('url','./images/avatar.png') 
        window.location.href = ('Profile.html')
        valid = true   

 
    }else{
        $('#alertMsg').text(jsonObj.error)
        $('#alert').fadeIn();
        valid = false;
    }
  return valid;
}



// 2- Profile Page 

// User Log Out
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
    sessionStorage.clear()

  }
if(sessionStorage.getItem("url") !== null){
    let profilePictureUrl = sessionStorage.getItem('url') //====
    $('#profilePicture').attr('src',profilePictureUrl)
}

// 3- Dashboard Page
function dbShow(){
  let token = sessionStorage.getItem('Token')
  let usr = sessionStorage.getItem('Name')
  let profilePictureUrl = sessionStorage.getItem('url') //====

  if(token){
    $('#accountSett').show()
    $('#dblogOut').show()
    $('#searchBar').show()
    $('#usrBar').show()
    $('#profilePicture').show()
    $('#dbUsr').text(usr)
    $('#profilePicture').attr('src',profilePictureUrl)
    $('#homeLink').attr('href','./profile.html')

  }
}
// 4- User Data Page

 // Edit Profile

function showData(){
    let name = sessionStorage.getItem('Name')
    let passwd = sessionStorage.getItem('Password') 
  
  if(sessionStorage.getItem("url") !== null){
    let profilePictureUrl = sessionStorage.getItem('url')  //===
    $('#profilePicture').attr('src',profilePictureUrl)
  }
    $('#myFile').change( function(e) {
      var imgSrc = URL.createObjectURL(e.target.files[0]);
      $('#profilePicture').attr('src', imgSrc);
      sessionStorage.removeItem('url') //=====
      sessionStorage.setItem('url',imgSrc) //======
  });



    $('#usrData').text(''); 
    $('#usrData').append(
        `<tr id='oldData'>
        <td> ${name}</td>
        <td> ${passwd}</td>
        <td> <button class='btn btn-primary' onclick = "editUsrData()" id='edit'> Edit </button> </td>
        </tr>` +

        `<tr id = 'inputData' style='display:none'>
        <td> <input name='newName' type='text' value='${name}'></td>
        <td> <input name='newPassword' type='text' value='${passwd}'></td>
        <td> <button class='btn btn-primary' onclick="saveUsrData()"> Save </button> </td>
        <td> <button class='btn btn-primary' onclick="cancelUsrData()"> cancel </button> </td>
        </tr>`    
  )
}

function editUsrData(){
    $('#usrData #oldData').hide()
    $('#usrData #inputData').show()

}

function cancelUsrData(){
    $('#usrData #oldData').show()
    $('#usrData #inputData').hide()
  
}

async function saveUsrData(){
    let newName = document.getElementsByName('newName')[0];
    let newPassword = document.getElementsByName('newPassword')[0];

    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Password");

    sessionStorage.setItem('Name',newName.value);
    sessionStorage.setItem('Password',newPassword.value)

    let loginObj = {username:(newName.value),password:(newPassword.value)};

    let htResponse;
    htResponse = await fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/register",{
            method : 'POST',
            headers:{
              "content-type":"application/json"},
            body:JSON.stringify(loginObj)
          })
    let jsonObj = await htResponse.json();
    // console.log(jsonObj)

    if(jsonObj.error){
        $('#alertMsg').text(jsonObj.error)
        $('#alert').fadeIn();
    }
    else{
        $('#alert').fadeOut();
        showData()
    }
}


// 5-Sign Up
async function signUP(){
  let  newuser = document.getElementById('newUsr')
  let  newpwd = document.getElementById('newPwd')
  let email = document.getElementById('email')

  let loginObj = {username:(newuser.value),password:(newpwd.value),email:(email.value)};

  let htResponse = await fetch("https://fast-refuge-93700.herokuapp.com/http://anyservice.imassoft.com/15/register",{
          method : 'POST',
          headers:{
            "content-type":"application/json"},
          body:JSON.stringify(loginObj)
        })
        let jsonObj = await htResponse.json();
        if(jsonObj.token){
          window.location.href = ('./index.html')
            console.log(jsonObj)
            valid = true   
        }else{
            console.log(jsonObj)
            valid = false;
        }
      return valid;
    }

//Button Scroll 
scroll = $(".fa-arrow-circle-up");
scroll.click(function() {
    $("html,body").animate({ scrollTop: 0 }, 2000);
});

// To Remove Arrows in Slider
let arrow = document.getElementsByClassName('aslider-nav')[0];
arrow.remove()

let rightArrow = document.getElementsByClassName('aslider-next')[0];
rightArrow.remove()