import userModel from '../models/userModel.js'

export default class userController{
    constructor(){
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(id,username, password, email, phone, birthday, address, sex, fullname, photo, points) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(id,username, password, email, phone, birthday, address, sex, fullname, photo, points));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`O nome de utilizador "${username}" já existe!`);
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
}

