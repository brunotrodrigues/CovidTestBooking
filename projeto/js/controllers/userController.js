import UserModel from '../models/userModel.js'

export default class userController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }
    getAccountRole(username) {
        let user = this.users.filter(user => user.username === username)[0]
        return user.type
    }
    getAll() {
        return this.users
    }
    register(newuser) {
        if (!this.users.some(user => user.username === newuser.username)) {
            this.users.push(new UserModel(newuser));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`O nome de utilizador "${username}" já existe!`);
        }
    }

    updateUser(Edituser, adm) {
        //vallidações no campos se vazio
        if (true) {
            
            if (Edituser.username != sessionStorage.getItem('loggedUser')) {
                //usernameAlterado, validar se esse username existe
                if (!this.users.some(user => Edituser.username == sessionStorage.getItem('loggedUser'))) {
                    localStorage.setItem('users', JSON.stringify(this.users.map(user => user.username == sessionStorage.getItem('loggedUser') ? Edituser : user)))

                } else { alert('Username em uso, retorne para o original ou tente outro') }

            } else {
                localStorage.setItem('users', JSON.stringify(this.users.map(user => user.username == Edituser.username ? Edituser : user)))
            }


        } else {
            throw Error('Editar Inválido')
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Login Invalido!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')


    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }

    removeUser(username) {
        let remUser = confirm(`Deseja mesmo remover o user ${username}?`)
        if (remUser) {
            localStorage.setItem("users", JSON.stringify(this.users.filter(user => user.username != username)))

            location.reload()
        }
    }

}

