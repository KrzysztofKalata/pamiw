function attachEvents(){
    var firstname = document.getElementById("firstname");
    firstname.addEventListener("change",validateAll);

    var lastname = document.getElementById("lastname");
    lastname.addEventListener("change",validateAll);

    var login = document.getElementById("login");
    login.addEventListener("change",validateAll);
    
    var password = document.getElementById("password");
    password.addEventListener("change",validateAll);

    var confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.addEventListener("change",validateAll);

}

function validateAllOther(){
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
    if(password === '' || confirmPassword === ''){
        return false;
    }
    if(password == confirmPassword){
        return true;
    } else {
        alert("Hasła nie są takie same");
        return false;
    }
}

function validateFirstName(){
    var firstname = document.getElementById("firstname").value;
    if(firstname === ''){
        return false;
    }
    var letters = /^[A-Z]{1}[a-z]+/;  
    if(firstname.match(letters)[0] === firstname){
        return true;
    } else {
        alert("Blędne imię");
        return false;
    }
}


function validateLastName(){
    var lastname = document.getElementById("lastname").value;
    if(lastname === ''){
        return false;
    }
    var letters = /^[A-Z]{1}[a-z]+/;
    if(lastname.match(letters)[0] === lastname){
        return true;
    } else {
        alert("Blędne nazwisko");
        return false;
    }
}


function validatePassword(){
    var password = document.getElementById("password").value;
    if(password === ''){
        return false;
    }
    if(String(password).length > 7){
        return true; 
    } else {
        alert("Hasło musi mieć przynajmniej 8 znaków");
        return false; 
    }
}

function validateAll(){
    login = document.getElementById("login").value;
    validateFirstName();
    validateLastName();
    validatePassword();
    checkPasswordsEqual();
    if(login === ''){
        console.log('brak loginu');
        return false;
    }
    let requestUrl = "https://infinite-hamlet-29399.herokuapp.com/check/" + login;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl, false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            var jsonResponse = JSON.parse(xhr.responseText)
            console.log(xhr.status);
            console.log(jsonResponse);
            if(xhr.status == 200 && jsonResponse[login] == 'available'){
                console.log('po walidacji loginu');
                validateAllOther();
            } else {
                alert("Login nie jest unikalny");
                return false;
            }
        } else {
            return false;
        }
    }
    xhr.send(null);
}


attachEvents();