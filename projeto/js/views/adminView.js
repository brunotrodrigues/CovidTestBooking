import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();
        this.list()   
    }
    // renderizar a table
    list() {
        let table = document.querySelector("#tabelaUser")        
        
        this.userController.getAll().forEach(user => {
            console.log(user)
            let string="<tr>"
            let username
            Object.entries(user).forEach(([key,value])=>{
                string+=`<td>${value}</td>`
                if(key=="username"){
                    username=value
                }
            })
            string+=`<td><input type='button' value='Delete' id="${username}" class="deleteBtn"/><br><input type='button' value='Editar' id="${username}" class="editBtn"/></td>`
            string+="</tr>"
            table.innerHTML+=string     //adiciona ao elemento table

            //butao remover
            const btns=document.querySelectorAll(".deleteBtn")
            console.log(this.userController.getAll())
            for (const btn of btns) {
                btn.addEventListener("click", () => {
                    const username = btn.id
                    console.log(username)
                    this.userController.removeUser(username)
                })
            }

            //butao editar


            //butao criar
            
            
        });
    }


}
