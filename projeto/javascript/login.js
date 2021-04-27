let userArray = localStorage.getItem('user') == null ? [] : JSON.parse(localStorage.getItem('user'));
document.getElementById('registerform').addEventListener('submit', function (event) {
    event.preventDefault()
    let username = document.getElementById('username').value;
    let fullname = document.getElementById('fullname').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let birthday = document.getElementById('birthday').value;
    let bi = document.getElementById('bi').value;
    let cellphone = document.getElementById('cellphone').value;
    // sexo

    let user = { username: username, fullname: fullname, password: password, email: email, address: address, birthday: birthday, bi: bi, cellphone: cellphone } // sexo
    console.log(user)
    if (username != "" && password != "" && email != "" && username != " " && password != " " && email != " ") {
        if (!userArray.filter(user => user.username == username).length) {
            userArray.push(user)
            localStorage.setItem('user', JSON.stringify(userArray));
            
        } else {
            alert("Erro, Username repetido tente novamente")
        }
    } else {
        alert("Preencha os campos")
    }

})


