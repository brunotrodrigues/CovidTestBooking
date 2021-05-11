let messageArray = localStorage.getItem('message') == null ? [] : JSON.parse(localStorage.getItem('message'));

function submit_message() {
    let fname = document.getElementById('fname').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;

    let message = {fname: fname, email: email, subject: subject}
    console.log(message)
    messageArray.push(message)
    localStorage.setItem('message', JSON.stringify(messageArray));

}