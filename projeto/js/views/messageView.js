import MessageController from '../controllers/messageController.js'

export default class MessageView {
    constructor() {
        this.messageController = new MessageController();

        this.frmLogin = document.querySelector('#name_contact');
        this.loginUsername = document.querySelector('#email_contact');
        this.loginPassword = document.querySelector('#message_contact');
        

        this.messageButton = document.querySelector('#btnMessage');
    }
}