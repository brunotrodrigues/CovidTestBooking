import UserController from '../controllers/UserController.js'

export default class ProfileView {
    constructor() {
        this.userController = new UserController();
        this.user=this.userController.getAll()
        this.userNameEdit = document.getElementById('txt_username_edit')
        this.fullnameEdit = document.getElementById('txt_fullname_edit')
        this.emailEdit = document.getElementById('txt_email_edit')
        this.addressEdit = document.getElementById('txt_address_edit')
        this.phoneEdit = document.getElementById('txt_phone_edit')
        this.GenderEdit = document.getElementById('txt_gender_edit')
        this.birthdayEdit = document.getElementById('date_birthday_edit')
        this.passwordEdit = document.getElementById('txt_password_edit')
        this.confirmpasswordEdit = document.getElementById('txt_confirmPassword_register')


        // Gestão dos botões da navbar
        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        if (this.logoutButton) {
            this.bindLogout();
        }

        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();

        this.loadUserData()

    }

    loadUserData(){

    }
    /**
     * Função que define um listener para o botão de logout
     */
     bindLogout() {
        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            location.reload()
        }) 
    }

    updateStatusUI() {
        if (this.userController.isLogged()) {

            this.loginButton.style.visibility = 'hidden'
            this.registerButton.style.visibility = 'hidden'
            this.logoutButton.style.visibility = 'visible'
            let loggedUser=sessionStorage.getItem('loggedUser')
            document.querySelector('.container1').innerHTML += `<div class="welcomeuser"><p><a href="../html/profile.html"><img  src="https://via.placeholder.com/50"/></a>Bem-vindo ${loggedUser}</p></div>`;
        } else {
            this.loginButton.style.visibility = 'visible'
            this.registerButton.style.visibility = 'visible'
            this.logoutButton.style.visibility = 'hidden'
            window.location.href = "../index.html"
        }
    }
    /**
     * Função que define e exibe uma mensagem de sucesso ou de erro
     * @param {string} event tipo de evento (login ou register)
     * @param {string} text mensagem a ser exibida 
     * @param {string} type danger - caso seja uma mensagem de erro; success - caso seja uma mensagem de sucesso
     */
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }


}    
