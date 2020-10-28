function attachEvents(){
    var firstname = document.getElementById("firstname");
    firstname.addEventListener("change",validateAll);

    var lastname = document.getElementById("lastname");
    lastname.addEventListener("change",validateAll);

    var login = document.getElementById("login");
    login.addEventListener("change",validateLogin);
    
    var password = document.getElementById("password");
    password.addEventListener("change",validateAll);

    var confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.addEventListener("change",validateAll);

  //  var photo = document.getElementById("photo");
  //  photo.addEventListener("change",readFile);
       

}

function validateAll(){
    var submit = document.getElementById("submit");
    if(validateFirstName() && validateLastName() && validatePassword() && checkPasswordsEqual()){
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
}

function checkPasswordsEqual(){
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if(password == confirmPassword){
        return true;
    } else {
        return false;
    }
}

function validateFirstName(){
    var firstname = document.getElementById("firstname").value;
    if (String(firstname).length > 1) {
        var firstChar = String(firstname).charAt(0);
        var withoutFirstChar = String(firstname).substring(1,String(firstname).length);
        if(firstChar === firstChar.toUpperCase() && withoutFirstChar === withoutFirstChar.toLowerCase()){
            return true;
        } else {
            return false;
        }
    }
}

function validateLastName(){
    var lastname = document.getElementById("lastname").value;
    if (String(lastname).length > 1) {
        var firstChar = String(lastname).charAt(0);
        var withoutFirstChar = String(lastname).substring(1,String(lastname).length);
        if(firstChar === firstChar.toUpperCase() && withoutFirstChar === withoutFirstChar.toLowerCase()){
            return true;
        } else {
            return false;
        }
    }
}

function validatePassword(){
    var password = document.getElementById("password").value;
    if(String(password).length > 7){
        return true; 
    } else {
        return false; 
    }
}
/*
function validateLogin2(){
    let requestUrl = "https://infinite-hamlet-29399.herokuapp.com/check/" + document.getElementById("login").value;
    Promise.resolve(
        fetch(requestUrl,{method: 'GET', headers:'Access-Control-Allow-Origin'})
            .then(function(response){
                console.log(response.json());
            }).catch((error) => {console.error('Error:', error)})
        );
        
}*/

function validateLogin(){
    let requestUrl = "https://infinite-hamlet-29399.herokuapp.com/check/" + document.getElementById("login").value;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl, false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            console.log(xhr.statusText + '' + xhr.responseText);
        }
    }
    xhr.send(null);
}


attachEvents();