if(window.localStorage.getItem("Email")==null){
    $(".loginui").show();
    $(".logoutui").hide();
}else{
    $(".loginui").hide();
    $(".logoutui").show();
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    
    console.log("Email: " + responsePayload.email);

    window.localStorage.setItem("Email",responsePayload.email)
    window.localStorage.setItem("Name",responsePayload.name)
    window.localStorage.setItem("Email",responsePayload.email)


    $(".loginui").hide();
    $(".logoutui").show();
    window.location.reload();
}


window.onload = function () {
    if(window.localStorage.getItem("Email")==null){
      $(".loginui").show();
      $(".logoutui").hide();
      google.accounts.id.initialize({
        client_id: "802989747573-7g434svbnrl7ljqo48u1e9b551c5dj7h.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
    }
    //google.accounts.id.prompt(); // also display the One Tap dialog
    else{
      $(".loginui").hide();
      $(".logoutui").show();
      $('.head_contact').html(`Welcome <b>${window.localStorage.getItem('Name')}</b>`)

    }
}
const button = document.getElementById('signout_button');
button.onclick = () => {
  google.accounts.id.disableAutoSelect();
  window.localStorage.removeItem("Email")
    $(".loginui").show();
    $(".logoutui").hide();
    $('.head_contact').html(``)
}