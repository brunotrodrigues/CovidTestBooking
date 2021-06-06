import userController from '../controllers/userController.js'

export default class adminView {
    constructor() {
        this.userController = new userController();
        this.list()
        
    }

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
            string+=`<td><input type='button' value='Delete' id="${username}" class="deleteBtn" /></td>`
            string+="</tr>"
            table.innerHTML+=string
            const btns=document.querySelectorAll(".deleteBtn")
            console.log(this.userController.getAll())
            for (let i = 0; i < btns.length; i++) {
                const btn = btns[i];
                btn.addEventListener("click",function(e){
                    this.userController.removeUser(id)
                })
                
            }
            
            
        });
    }
    
    
    
   
}
