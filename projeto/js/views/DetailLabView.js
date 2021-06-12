import labController from '../controllers/LabController.js'
import UserController from '../controllers/UserController.js'

export default class DetailLabView {

    constructor() {
        this.labController = new labController()

        // Gestão dos detalhes do lab
        this.labName = document.querySelector('#labName')
        this.labType = document.querySelector('#labType')
        this.labDescription = document.querySelector('#labDescription')
        this.labPhoto = document.querySelector('#labPhoto')
        this.labPrice = document.querySelector('#labPrice')
        this.labMorada = document.querySelector('#labMorada')
        this.labSchedule = document.querySelector('#labschedule')
        this.confirmMessage = document.querySelector('#confirmMessage')
        this.frmConfirm = document.querySelector('#frmConfirm');

        this.schedule = document.querySelector("#schedule")
        this.renderSchedule(this.labController.getLabs())




        this.fillLabData()
    }

    getCurrentDate(){
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
        this.labSchedule.innerHTML = currentLab.schedule
        this.labPhoto.src = currentLab.photo
    }

    renderSchedule() {
        const currentLab = this.labController.getCurrentLab()

        this.labSchedule = currentLab.schedule
        
        this.labSchedule = this.labSchedule.split(" ")
        console.log(this.labSchedule)
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
            this.displayMessage('confirm', 'Marcação efetuada!', 'success');
            // Espera 1 seg. antes de fazer refresh à pagina
            // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
            setTimeout(() => { location.reload() }, 1000);
        });
    }



    displayMessage(text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        this.confirmMessage.innerHTML = message
    }

}