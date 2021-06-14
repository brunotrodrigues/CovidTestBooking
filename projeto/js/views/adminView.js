import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();
        this.list()

        // Gestão do form de registo
        this.frmRegister = document.querySelector('#frmRegister');
        this.registerUsername = document.querySelector('#txt_username_register');
        this.registerFullname = document.querySelector('#txt_fullname_register');
        this.registerEmail = document.querySelector('#txt_email_register');
        this.registerAddress = document.querySelector('#txt_address_register');
        this.registerPhone = document.querySelector('#txt_phone_register');
        this.registerGender = document.querySelector('#txt_gender_register');
        this.registerBirthday = document.querySelector('#date_birthday_register');
        this.registerPassword = document.querySelector('#txt_password_register');
        this.registerPassword2 = document.querySelector('#txt_confirmPassword_register');
        this.registerMessage = document.querySelector('#registerMessage')

        this.EditRegister = document.querySelector('#frmEdit');
        this.EditUsername = document.querySelector('#txt_username_register_edit');
        this.EditFullname = document.querySelector('#txt_fullname_register_edit');
        this.EditEmail = document.querySelector('#txt_email_register_edit');
        this.EditAddress = document.querySelector('#txt_address_register_edit');
        this.EditPhone = document.querySelector('#txt_phone_register_edit');
        this.EditGender = document.querySelector('#txt_gender_register_edit');
        this.EditBirthday = document.querySelector('#date_birthday_register_edit');
        this.EditPassword = document.querySelector('#txt_password_register_edit');
        this.EditPassword2 = document.querySelector('#txt_confirmPassword_register_edit');
        this.EditSubmitModal = document.querySelector('#submitModal');


        this.bindRegisterForm();
        this.bindEditForm()
        // Gestão dos botões da navbar
        
        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        if (this.logoutButton) {
            this.bindLogout();
        }

        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    /**
     * Função que define um listener para o botão de registo
     */

    bindEditForm() {
        this.EditRegister.addEventListener('submit', event => {
            event.preventDefault()

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('As duas passwords não são iguais');
                }
                let modifyUser = this.userController.getAll().filter(user => user.username == this.EditUsername.value)[0]
                let update = {
                    username: this.EditUsername.value,
                    password: this.EditPassword.value,
                    confirmPassword: this.EditPassword2.value,
                    email: this.EditEmail.value,
                    phone: this.EditPhone.value,
                    birthday: this.EditBirthday.value,
                    address: this.EditAddress.value,
                    gender: this.EditGender.value,
                    fullname: this.EditFullname.value,
                    photo: modifyUser.photo,
                    points: modifyUser.points,
                    type: modifyUser.type
                }
                console.log("edit")
                this.userController.updateUser(update);
                this.displayMessage('Edit', 'Utilizador Editado com sucesso!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('Edit', err, 'danger');
            }
        })
    }


    bindRegisterForm() {
        this.frmRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('As duas passwords não são iguais');
                }
                let newuser = {
                    username: this.registerUsername.value,
                    password: this.registerPassword.value,
                    confirmPassword: this.registerPassword2.value,
                    email: this.registerEmail.value,
                    phone: this.registerPhone.value,
                    birthday: this.registerBirthday.value,
                    address: this.registerAddress.value,
                    gender: this.registerGender.value,
                    fullname: this.registerFullname.value,
                    photo: '',
                    points: 0,
                    type: 'user'
                }
                console.log(newuser)
                this.userController.register(newuser);
                this.displayMessage('register', 'Utilizador registado com sucesso!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }
        })
    }

    // renderizar a table
    list() {
        let table = document.querySelector("#tabelaUser")
        this.userController.getAll().forEach(user => {
            console.log(user)
            let string = "<tr>"
            let username
            Object.entries(user).forEach(([key, value]) => {
                string += `<td>${value}</td>`
                if (key == "username") {
                    username = value
                }
            })
            //<a href="#registerModal" class="btn btn-primary ml-3" data-toggle="modal" id="${username}">Editar</a>
            string += `<td><input type='button' value='Delete' id="${username}" class="deleteBtn"/><br><a href="#EditModal" class="btn btn-primary ml-3 editBtn" data-toggle="modal" id="${username}">Editar</a></td>`
            string += "</tr>"
            table.innerHTML += string     //adiciona ao elemento table

            //butao remover
            const btns = document.querySelectorAll(".deleteBtn")
            console.log(this.userController.getAll())
            for (const btn of btns) {
                btn.addEventListener("click", () => {
                    const username = btn.id
                    console.log(username)
                    this.userController.removeUser(username)
                })
            }

            const btnsEdit = document.querySelectorAll(".editBtn")
            for (const btn of btnsEdit) {
                btn.addEventListener("click", () => {
                    const username = btn.id
                    let user = this.userController.getAll().filter(user => user.username == btn.id)[0]
                    this.EditUsername.value = user.username
                    this.EditFullname.value = user.fullname
                    this.EditEmail.value = user.email
                    this.EditAddress.value = user.address
                    this.EditPhone.value = user.phone
                    this.EditGender.value = user.gender
                    this.EditBirthday.value = user.birthday
                    this.EditPassword.value = user.password
                    this.EditPassword2.value = user.confirmPassword

                })

            }
        });
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
            // let loggedUser = sessionStorage.getItem('loggedUser')
            // document.querySelector('.container1').innerHTML += `<div class="welcomeuser"><p>${loggedUser}</p></div>`;
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
