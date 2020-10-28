function attachEvents(){
    var firstname = document.getElementById("firstname");
    firstname.addEventListener("change",validateFirstName);
    firstname.addEventListener("change",validateLoginIsFree);

    var lastname = document.getElementById("lastname");
    lastname.addEventListener("change",validateLastName);
    lastname.addEventListener("change",validateLoginIsFree);

    var login = document.getElementById("login");
    login.addEventListener("change",validateLogin);
    login.addEventListener("change",validateLoginIsFree);
    
    var password = document.getElementById("password");
    password.addEventListener("change",validatePassword);
    password.addEventListener("change",validateLoginIsFree);

    var confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.addEventListener("change",checkPasswordsEqual);
    confirmPassword.addEventListener("change",validateLoginIsFree);
    
    var photo = document.getElementById("photo");
    photo.addEventListener("change",validateLoginIsFree);

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
        if(!validateAllFlag){
            alert("Hasła nie są takie same");
        }
        return false;
    }
}

function validateFirstName(){
    var firstname = document.getElementById("firstname").value;
    if(firstname === ''){
        return false;
    }
    var letters = /^[A-Z]{1}[a-z]+/;  
    if(firstname.match(letters) !== null && firstname.match(letters)[0] === firstname){
        return true;
    } else {
        if(!validateAllFlag){
            alert("Blędne imię");  
        }
        return false;
    }
}

function validateLastName(){
    var lastname = document.getElementById("lastname").value;
    if(lastname === ''){
        return false;
    }
    var letters = /^[A-Z]{1}[a-z]+/;
    if(lastname.match(letters) !== null && lastname.match(letters)[0] === lastname){
        return true;
    } else {
        if(!validateAllFlag){
            alert("Blędne nazwisko");
        }
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
        if(!validateAllFlag){
            alert("Hasło musi mieć przynajmniej 8 znaków");
        }
        return false; 
    }
}

function validatePhoto () {
    var photo = document.getElementById("photo");
    console.log(photo);
    console.log(photo.value);
    if(photo.value === ''){
        return false;
    } else {
        return true;
    }
}

function validateLogin () {
    login = document.getElementById("login").value;
    if(login === ''){
        console.log('Brak loginu');
        return false;
    }
    var letters = /^[A-Za-z]+/;
    if(login.match(letters) === null || login.match(letters)[0] !== login){
        if(!validateAllFlag){
            alert('Błędny login');
        }
        return false;
    } else {
        return true;
    }
}
function validateLoginIsFree(){
    login = document.getElementById("login").value;
    let requestUrl = "https://infinite-hamlet-29399.herokuapp.com/check/" + login;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl, false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            var jsonResponse = JSON.parse(xhr.responseText);
            console.log(jsonResponse[login]);
            console.log(xhr.status);
            if(xhr.status === 200 && jsonResponse[login] == 'available'){
                validateOther();
                return true;
            } else {
                if(!validateAllFlag){
                    alert("Login nie jest unikalny");
                }
                submit.disabled = true;
                return false;
            }
        } else {
            submit.disabled = true;
            return false;
        }
    }
    xhr.send(null);
}

function validateOther(){
    validateAllFlag = true;
    if(!validateLogin()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    console.log(!validateFirstName());
    if(!validateFirstName()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    console.log(!validateLastName());
    if(!validateLastName()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    console.log(!validatePassword());
    if(!validatePassword()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    console.log(!checkPasswordsEqual());
    if(!checkPasswordsEqual()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    console.log(!validatePhoto());
    if(!validatePhoto()){
        validateAllFlag = false;
        submit.disabled = true;
        return;
    }
    validateAllFlag = false;
    submit.disabled = false;
}
validateAllFlag = false;
attachEvents();