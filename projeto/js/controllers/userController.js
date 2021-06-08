import UserModel from '../models/userModel.js'

export default class userController{
    constructor(){
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }
    getAccountRole(username){
        let user=this.users.filter(user=>user.username===username)[0]
        return user.type
    }
    getAll(){
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

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            localStorage.setItem('loggedUser', username)
        } else {
            throw Error('Login Invalido!');
        }
    }

    logout() {
        localStorage.removeItem('loggedUser')
    }
    
    isLogged() {
        return localStorage.getItem('loggedUser') ? true : false
    }
    
    removeUser(username){
        let remUser = confirm(`Deseja mesmo remover o user ${username}?`)
    if (remUser) {
        localStorage.setItem("users", JSON.stringify(this.users.filter(user=>user.username!=username)))
        
        location.reload()
    }
    }
}

