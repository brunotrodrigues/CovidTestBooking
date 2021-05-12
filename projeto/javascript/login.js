const userArray = localStorage.getItem('user') == null ? [] : JSON.parse(localStorage.getItem('user'));

function submit_register(){
    document.getElementById('registerform').addEventListener('submit', function (event) {
        event.preventDefault()
        const username = document.getElementById('username').value;
        const fullname = document.getElementById('fullname').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const birthday = document.getElementById('birthday').value;
        const bi = document.getElementById('bi').value;
        const cellphone = document.getElementById('cellphone').value;
        const sex = document.getElementById('sex').value;    
    
        const user = { username: username, fullname: fullname, password: password, email: email, address: address, birthday: birthday, bi: bi, cellphone: cellphone, sex: sex } 
        console.log(user)
        
        if (username != "" && password != "" && email != "" && username != " " && password != " " && email != " ") {
            if (!userArray.filter(user => user.username == username).length) {
                userArray.push(user)
                localStorage.setItem('user', JSON.stringify(userArray));
                alert("Utilizador, registado")
                
            } else {
                alert("Erro, Username repetido tente novamente")
            }
        } else {
            alert("Preencha os campos")
        }
    })    
}



function submit_login(){
    document.getElementById('loginform').addEventListener('submit', function (event) {
        event.preventDefault()    
        const login_username = document.getElementById('login_username').value;
        const login_password = document.getElementById('login_password').value;
        
        if (login_username != "" && login_password != "" && login_username != " " && login_password != " ") {
            try {
                if (userArray.filter(user => user.username == login_username)[0].username == login_username && userArray.filter(user => user.username == login_username)[0].password == login_password) {
                    alert('Login bem sucedido');
                    localStorage.setItem('loggedUser', JSON.stringify(userArray.filter(user => user.username == login_username)[0].username));
                }
                else {
                    alert("Erro, tente novamente");
                }
            } catch (error) {
                alert("user inexistente")
            }
        } else {
            alert("Preencha os campos")
        }
        
    })    
}

