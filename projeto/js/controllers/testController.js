import testModel from '../models/testModel.js'

export default class testController {
    constructor(){
        this.tests = localStorage.tests ? JSON.parse(localStorage.tests) : [];
        
    }

    addShedule(lab,time,date){
        console.log(lab,time,date)
        if(time!=null){

        if(this.tests.filter(test=>test.name==lab&&test.date==date&&test.time==time).length==0){
            let test={name:lab,date:date,time:time,user:sessionStorage.getItem('loggedUser')}
            this.tests.push(test)
            localStorage.setItem('tests',JSON.stringify(this.tests))

        }else{
            alert('já existe uma marcação')
        }}else{
            alert('Insira uma hora ')
        }

    }

    getAll(){
        return this.tests
    }
}
