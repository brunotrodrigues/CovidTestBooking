import labController from '../controllers/LabController.js'

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

}
