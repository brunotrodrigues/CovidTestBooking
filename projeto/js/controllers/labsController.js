import labsModel from '../models/labsModel.js'

export default class labsController{
    constructor() {
        this.labs = localStorage.labs ? JSON.parse(localStorage.labs) : [];
    }

}