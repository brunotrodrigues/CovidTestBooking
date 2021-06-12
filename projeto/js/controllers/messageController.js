import MessageModel from '../models/messageModel.js'

export default class MessageController{
    constructor(){
        this.message = localStorage.message ? JSON.parse(localStorage.message) : [];
    }
    register() {
        
    }
}