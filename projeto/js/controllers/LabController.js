import LabModel from '../models/LabModel.js'

export default class labController {
    constructor() {
        this.labs = localStorage.labs ? JSON.parse(localStorage.labs) : [];
        this.currentLab = sessionStorage.lab ? sessionStorage.lab : null

    }

    create(name, description, photo, phone, longitude, latitude, type, schedule, price, comments, likes, morada) {
        if (!this.labs.some(lab => lab.name === name)) {
            this.labs.push(new LabModel(name, description, photo, phone, longitude, latitude, type, schedule, price, comments, likes, morada));
            localStorage.setItem('labs', JSON.stringify(this.labs))
        } else {
            throw Error(`Lab with name "${name}" already exists!`);
        }
    }

    remove(name) {
        this.labs = this.labs.filter(lab => lab.name != name)
        localStorage.setItem('labs', JSON.stringify(this.labs))
    }

    setCurrentLab(name) {
        this.currentLab = name
        sessionStorage.setItem("lab", name);
    }

    getCurrentLab() {
        return this.labs.find(lab => lab.name == this.currentLab)
    }

    getLabs(filterName = '', filterType = '', isSorted = false) {
        let filteredLabs = this.labs.filter(
            lab =>
                (lab.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (lab.type == filterType || filterType === '')
        )

        filteredLabs = isSorted ? filteredLabs.sort(this.#compare) : filteredLabs

        return filteredLabs
    }

    #compare(labA, labB) {
        if (labA.name > labB.name)
            return 1;
        if (labA.name < labB.name)
            return -1;
        return 0;
    }

}
