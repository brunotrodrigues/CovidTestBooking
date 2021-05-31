import labController from '../controllers/labsController.js'
import UserController from '../controllers/userController.js'

export default class labView {

    constructor() {
        this.labController = new labController()
        this.userController = new UserController()

        // Catálogo: filtro
        this.txtlab = document.querySelector("#txtlab")
        this.sltGenre = document.querySelector("#sltGenre")
        this.btnFilter = document.querySelector("#btnFilter")
        this.bindFilter()

        // Catálogo: ordenação
        this.btnSort = document.querySelector("#btnSort")
        this.bindSort()

        // Catálogo: adição de lab
        this.btnAdd = document.querySelector("#btnAdd")
        this.bindAdd()

        // Catálogo: listagem de labs
        this.catalog = document.querySelector("#myCatalog")
        this.renderCatalog(this.labController.getlabs())
    }

    bindFilter() {
        this.btnFilter.addEventListener('click', () => {
            this.renderCatalog(this.labController.getlabs(this.txtlab.value, this.sltGenre.value))
        })
    }

    bindSort() {
        this.btnSort.addEventListener('click', () => {
            this.renderCatalog(this.labController.getlabs(this.txtlab.value, this.sltGenre.value, true))
        })
    }

    bindAdd() {
        this.btnAdd.addEventListener('click', () => {
            location.href = 'html/newlab.html';
        })
    }

    renderCatalog(labs = []) {
        // Gerir a visualização do botão Add
        this.userController.isLogged() ?
            this.btnAdd.style.visibility = 'visible' :
            this.btnAdd.style.visibility = 'hidden';

        // Gerir o catálogo
        let result = '<div class="row row-cols-3">'
        for (const lab of labs) {
            result += this.generatelabCard(lab)
        }
        result += '</div>'
        this.catalog.innerHTML = result

        // Gerir botões Add e See more
        this.bindAddRemoveEvent()
        this.bindAddSeeMoreEvent()
    }

    // <div class="col">
    // <div class="card">
    //     <img class="card-img-top" src="${lab.photo}" alt="">
    //     <div class="card-body">
    //         <h4 class="card-title">${lab.name}</h4>
    //         <p class="card-text">${lab.genre}</p>
    //         <button id="${lab.name}" class="btn btn-primary see">See more</button>



    generatelabCard(lab) {
        let html = `
        <div class="card card-margin">
          <div class="card-header no-border">
            <h5 class="card-title">${lab.name}</h5>
          </div>
          <div class="card-body pt-0">
            <div class="widget-49">
              <div class="widget-49-title-wrapper">
                <div class="card-header border-0">
                  <img src="${lab.photo}">
                </div>
                <div class="widget-49-meeting-info">
                  <span class="widget-49-pro-title">${lab.morada}</span>
                  <span class="widget-49-meeting-time">${lab.schedule}</span>
                </div>
              </div>
              <ol class="widget-49-meeting-points">
                <li class="widget-49-meeting-item"><span>${lab.description}</span></li>
                <li class="widget-49-meeting-item"><span>${lab.price}</span></li>
                <li class="widget-49-meeting-item"><span>${lab.type}</span>
                </li>
              </ol>
              <div class="widget-49-meeting-action">
                <a href="#" class="btn btn-sm btn-flash-border-primary">Marque Agora</a>
              </div>
            </div>
          </div>
        </div>
            `
        if (this.userController.isLogged()) {
            html += `<button id="${lab.name}" class="btn btn-danger remove">Remove</button>`
        }

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
                this.renderCatalog(this.labController.getlabs(this.txtlab.value, this.sltGenre.value))
            })
        }
    }

    bindAddSeeMoreEvent() {
        for (const btnSee of document.getElementsByClassName("see")) {
            btnSee.addEventListener('click', event => {
                this.labController.setCurrentlab(event.target.id)
                location.href = 'html/detaillab.html';
            })
        }
    }

}
