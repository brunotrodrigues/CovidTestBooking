export default class userModel{
    constructor(id,username, password, confirmPassword, email, phone, birthday, address, gender, type, fullname, photo, points){
        this.id = id
        this.username = username
        this.password = password
        this.confirmPassword = confirmPassword
        this.email = email
        this.phone = phone
        this.birthday = birthday
        this.address = address
        this.gender = gender
        this.fullname = fullname
        this.photo = ''
        this.points = 0
        this.type = 'user'
    }
}