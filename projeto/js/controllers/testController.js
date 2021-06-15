import testModel from '../models/testModel.js'

export default class testController {
    constructor(){
        this.tests = localStorage.tests ? JSON.parse(localStorage.tests) : [];
    }
}
