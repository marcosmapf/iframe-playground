const postMessage = (target, messageType, messageData) => {
    target.postMessage({ messageType, messageData }, document)
}

const iframeSetup = () => {
    const parent = window.parent
    const postButton = document.querySelector('.postMessage')
    const containerMessageStatus = document.querySelector('.messageStatus')
    const containerMessageType = document.querySelector('.messageType')
    const containerMessageData = document.querySelector('.messageData')

    postButton.addEventListener('click', () => {
        postMessage(parent, 'postMessage', 'message has been received')
    })
    window.addEventListener('message', ({ data: { messageType, messageData }, source }) => {
        containerMessageStatus.innerHTML = `New message received at: ${new Date().toTimeString()}`
        containerMessageType.innerHTML = messageType
        containerMessageData.innerHTML = messageData
    }) 
}

iframeSetup()
