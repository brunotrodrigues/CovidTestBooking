import labController from '../controllers/LabController.js'
import UserController from '../controllers/UserController.js'
import testController from "../controllers/testController.js"

export default class DetailLabView {

    constructor() {
        this.labController = new labController()
        this.userController = new UserController()
        this.testController = new testController()
        this.dataTeste = document.querySelector("#dataTeste")
        this.setDate()

        // Gestão dos detalhes do lab
        this.labName = document.querySelector('#labName')
        this.labType = document.querySelector('#labType')
        this.labDescription = document.querySelector('#labDescription')
        this.labPhoto = document.querySelector('#labPhoto')
        this.labPrice = document.querySelector('#labPrice')
        this.labMorada = document.querySelector('#labMorada')
        this.labschedule = document.querySelector('#labschedule')
        this.labSchedule = document.querySelector('#labschedule')
        this.confirmMessage = document.querySelector('#confirmMessage')
        this.frmConfirm = document.querySelector('#frmConfirm');
        this.createSubmitModal = document.querySelector('#btnSim')
        this.schedule = document.querySelector("#schedule")
        //this.renderSchedule(this.labController.getLabs())

        this.fillLabData()

        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        if (this.logoutButton) {
            this.bindLogout();
        }

        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();

        this.bindconfirmForm();


        this.bindButtonschedule()
        this.loadDates()
        this.changeColorsByTests()




    }
    changeColorsByTests() {
        let tests = this.testController.getAll()
        let btns = document.querySelectorAll(".cell")
        for (const btn of btns) {

            btn.style.backgroundColor = "white"
            btn.style.color = "black"
            btn.style.pointerEvents = 'auto'
        }
        tests.forEach(test => {
            if (test.date == this.dataTeste.value) {
                let btn = document.querySelector(`#${test.time}`)
                btn.style.backgroundColor = "red";
                btn.style.color = "white";
                btn.style.pointerEvents = 'none'
            }
        });
    }
    loadDates() {
        this.dataTeste.addEventListener('change', () => {
            this.changeColorsByTests()
        })
    }
    changeColors(id) {


        let btns = document.querySelectorAll(".cell")


        this.changeColorsByTests()

        let btn = document.querySelector(`#${id}`)
        btn.style.backgroundColor = "yellow";
        btn.style.color = "color";
        btn.style.pointerEvents = 'none'


    }

    bindButtonschedule() {
        let btns = document.querySelectorAll(".cell")
        for (const btn of btns) {
            btn.addEventListener("click", () => {
                if (!btn.disabled) {
                    const time = btn.id
                    sessionStorage.setItem('SelectedTime', time)
                    this.changeColors(time)
                }

            })
        }
    }

    setDate() {
        let date = new Date()
        console.log(date.getUTCDate())
        let year = date.getUTCFullYear()
        let day = date.getUTCDate()
        let month = date.getUTCMonth()
        month++
        month < 10 ? month = '0' + month : month
        day < 10 ? day = '0' + day : day
        let min = `${year}-${month}-${day}`
        let max = year + "-" + 12 + "-" + 31
        console.log(min, max)
        this.dataTeste.value = min
        this.dataTeste.setAttribute('max', max)
        this.dataTeste.setAttribute('min', min)
        sessionStorage.removeItem('SelectedTime')
    }
    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today
    }


    fillLabData() {
        const currentLab = this.labController.getCurrentLab()
        this.labName.innerHTML = currentLab.name
        this.labType.innerHTML = currentLab.type
        this.labDescription.innerHTML = currentLab.description
        this.labPrice.innerHTML = currentLab.price
        this.labMorada.innerHTML = currentLab.morada
        this.labschedule.innerHTML = currentLab.schedule
        this.labPhoto.src = currentLab.photo
    }

    renderSchedule() {
        const currentLab = this.labController.getCurrentLab()

        this.labSchedule = currentLab.schedule

        this.labSchedule = this.labSchedule.split("às")
        // Gerir o schedule
        let result = '<div class="row text-center mx-0">'

        let horaInicial = parseInt(this.labSchedule[0])
        let horaFinal = parseInt(this.labSchedule[1])
        let i;
        for (i = horaInicial; i < horaFinal; i++) {
            result += this.generateTimeCard(i)

        }
        this.schedule.innerHTML = result


    }

    generateTimeCard(i) {
        let html = `
        <div class="row text-center mx-0">
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:00</div>
            </div>
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:10</div>
            </div>
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:20</div>
            </div>
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:30</div>
            </div>
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:40</div>
            </div>
            <div class="col-md-2 col-4 my-1 px-2">
                <div class="cell py-1">${i}:50</div>
            </div>
        </div>
        `

        return html
    }

    bindconfirmForm() {
        this.frmConfirm.addEventListener('submit', event => {
            event.preventDefault();
            //this.displayMessage('confirm', 'Marcação efetuada!', 'success');
            this.testController.addShedule(sessionStorage.getItem('lab'), sessionStorage.getItem('SelectedTime'), this.dataTeste.value)
            // Espera 1 seg. antes de fazer refresh à pagina
            // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
            setTimeout(() => { location.reload() }, 1000);
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
            let loggedUser = sessionStorage.getItem('loggedUser')
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



}