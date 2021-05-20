import userModel from '../models/userModel.js'

export default class userController{
    constructor(){
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(username, password, confirmPassword, email, phone, birthday, address, sex, fullname, photo, points) {
        if (!this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(username, password));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    login(username, password, confirmPassword, email, phone, birthday, address, sex, fullname, photo, points) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Invalid login!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }
    
    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }
}

