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





        this.fillLabData()
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

    // generateSchedule(lab) {
    //     let html = `
        
    //     `

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