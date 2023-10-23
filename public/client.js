

const socket = io()
let fname;
let textarea =document.querySelector('#textarea')
let messageArea =document.querySelector('.message_area')

do{
    fname=prompt('please enter your name: ')

}while(!fname)

textarea.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message){
    let msg ={
        user: fname,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()



    //send to server 
    socket.emit('message',msg)







}

//append -it whatever will write it will direclty show in index page


function appendMessage(msg,type){
    let mainDiv =document.createElement('div')
    let className =type
    mainDiv.classList.add(className,'message')

    let markup  =`
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML =markup
    messageArea.appendChild(mainDiv)

}


//recieve messages

socket.on('message',(msg)=>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

//scroll message
function scrollToBottom(){
    messageArea.scrollTop =messageArea.scrollHeight
}