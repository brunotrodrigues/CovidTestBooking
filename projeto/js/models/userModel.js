export default class userModel{
    constructor(username, password, confirmPassword, email, phone, birthday, address, sex, fullname, photo, points){
        this.username = username
        this.password = password
        this.confirmPassword = confirmPassword
        this.email = email
        this.phone = phone
        this.birthday = birthday
        this.address = address
        this.sex = sex
        this.fullname = fullname
        this.photo = photo
        this.points = points
    }
}