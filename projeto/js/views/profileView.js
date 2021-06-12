import UserController from '../controllers/UserController.js'

export default class ProfileView {
    constructor() {
        this.userController = new UserController();

        this.userNameEdit = document.getElementById('txt_username_edit')
        this.fullnameEdit = document.getElementById('txt_fullname_edit')
        this.emailEdit = document.getElementById('txt_email_edit')
        this.addressEdit = document.getElementById('txt_address_edit')
        this.phoneEdit = document.getElementById('txt_phone_edit')
        this.GenderEdit = document.getElementById('txt_gender_edit')
        this.birthdayEdit = document.getElementById('date_birthday_edit')
        this.passwordEdit = document.getElementById('txt_password_edit')
        this.confirmpasswordEdit = document.getElementById('txt_confirmPassword_register')

    }



    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.loginButton.style.visibility = 'hidden'
            this.registerButton.style.visibility = 'hidden'
            this.logoutButton.style.visibility = 'visible'
            let loggedUser=localStorage.getItem('loggedUser')
            document.querySelector('.container1').innerHTML += `<div class="welcomeuser"><p><a href="../html/profile.html"><img  src="https://via.placeholder.com/50"/></a>Bem-vindo ${loggedUser}</p></div>`;
        } else {
            this.loginButton.style.visibility = 'visible'
            this.registerButton.style.visibility = 'visible'
            this.logoutButton.style.visibility = 'hidden'
        }
    }

}    
