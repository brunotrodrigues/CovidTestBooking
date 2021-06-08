export default class UserModel{
    constructor(newuser){
        this.username = newuser.username
        this.password = newuser.password
        this.confirmPassword = newuser.confirmPassword
        this.email = newuser.email
        this.phone = newuser.phone
        this.birthday = newuser.birthday
        this.address = newuser.address
        this.gender = newuser.gender
        this.fullname = newuser.fullname
        this.photo = ''
        this.points = 0
        this.type = 'user'
    }
}