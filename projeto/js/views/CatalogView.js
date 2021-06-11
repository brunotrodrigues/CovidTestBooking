import labController from '../controllers/LabController.js'
import UserController from '../controllers/UserController.js'

export default class LabView {

    constructor() {
        this.labController = new labController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtLab = document.querySelector("#txtLab")
        this.sltType = document.querySelector("#sltType")
        this.btnFilter = document.querySelector("#btnFilter")
        this.bindFilter()

        // Catálogo: ordenação
        this.btnSort = document.querySelector("#btnSort")
        this.bindSort()

        // // Catálogo: adição de lab
        // this.btnAdd = document.querySelector("#btnAdd")
        // this.bindAdd()

        // Catálogo: listagem de labs
        this.catalog = document.querySelector("#myCatalog")
        this.renderCatalog(this.labController.getLabs())

        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    bindFilter() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.labController.getLabs(this.txtLab.value, this.sltType.value))
        })
    }

    bindSort() {
        this.btnSort.addEventListener('click', () => {
            this.renderCatalog(this.labController.getLabs(this.txtLab.value, this.sltType.value, true))
        })
    }

    // bindAdd() {
    //     this.btnAdd.addEventListener('click', () => {
    //         location.href = 'html/newBand.html';
    //     })
    // }

    renderCatalog(labs = []) {
        // Gerir a visualização do botão Add
        // Gerir o catálogo
        let result = '<div class="card card-margin">'
        for (const lab of labs) {
            result += this.generateLabCard(lab)

        }
        result += '</div>'
        this.catalog.innerHTML = result

        // Gerir botões Add e See more
        // this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()

    }

    generateLabCard(lab) {
        let html = `
        <div class="card card-margin">
            <div class="card-header no-border">
                <h5 class="card-title">${lab.name}</h5>
            </div>
            <div class="card-body pt-0">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="card-header border-0">
                            <img src="${lab.photo}" alt="img_centros">
                        </div>
                        <div class="widget-49-meeting-info">
                            <span class="widget-49-pro-title">${lab.morada}</span>
                        </div>
                    </div>
                    <ol class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span>${lab.schedule}</span></li>
                        <li class="widget-49-meeting-item"><span>Telefone: ${lab.phone}</span></li>
                        <li class="widget-49-meeting-item"><span>Preço: ${lab.price}</span>
                        </li>
                    </ol>
                    <div class="widget-49-meeting-action">
                    <button id="${lab.name}" class="btn btn-primary see">Ver Centro</button>
                    </div>
                </div>
            </div>
        </div>
        `

        html += `
                </div>
            </div>
        </div>        
        `
        return html
    }


    bindAddRemoveEvent() {
        for (const btnRemove of document.getElementsByClassName("remove")) {
            btnRemove.addEventListener('click', event => {
                this.labController.remove(event.target.id)
                this.renderCatalog(this.labController.getLabs(this.txtLab.value, this.sltType.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.labController.setCurrentLab(event.target.id)
                location.href = '../html/detailLab.html';
            })
        }
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
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
