import labsModel from '../models/labsModel.js'

export default class labsController{
    constructor() {
        this.labs = localStorage.labs ? JSON.parse(localStorage.labs) : [];
        this.currentLab = sessionStorage.lab ? sessionStorage.lab : null
    }

    create(name, description, photo, phone, longitude, latitude, type, schedule, price, comments, likes, morada) {
        if (!this.labs.some(lab => lab.name === name)) {
            this.labs.push(new labModel(name, description, photo, phone, longitude, latitude, type, schedule, price, comments, likes, norada));
            localStorage.setItem('labs', JSON.stringify(this.labs))
        } else {
            throw Error(`Labs with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.labs = this.labs.filter(lab => lab.name != name)
        localStorage.setItem('labs', JSON.stringify(this.labs))
    }

    setCurrentlab(name) {
        this.currentlab = name
        sessionStorage.setItem("lab", name);
    }

    getCurrentlab() {
        return this.labs.find(lab => lab.name == this.currentlab)
    }

    getlabs(filterName = '', filtertype = '', isSorted = false) {
        let filteredlabs = this.labs.filter(
            lab =>
                (lab.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (lab.type == filtertype || filtertype === '')
        )

        filteredlabs = isSorted ? filteredlabs.sort(this.#compare) : filteredlabs

        return filteredlabs
    }

    #compare(labA, labB) {
        if (labA.name > labB.name)
            return 1;
        if (labA.name < labB.name)
            return -1;
        return 0;
    }



}