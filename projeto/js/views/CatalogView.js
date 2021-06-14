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

        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        if (this.logoutButton) {
            this.bindLogout();
        }

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
    
    mapMarkers(lab) {
        let map;
        function initMap() {
            this.labCoordinates = { lat: lab.latitude, lng: lab.longitude };
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 41.1556100, lng: -8.6309900 },
                zoom: 14,
                mapTypeId: "hybrid"
                });
                new google.maps.Marker({
                position: this.labCoordinates,
                map,
                title: lab.name,
            });
      
    }
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
