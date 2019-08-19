const createIframe = hostEl => {
    const iframeEl = document.createElement('iframe')
    iframeEl.setAttribute('sandbox', 'allow-same-origin allow-scripts')
    const src = 'iframe'
    const styleMap =  {
        width: '100%',
        height: '100%',
        minWidth: '200px',
        minHeight: '350px',
        border: '0 none'
    }
  
    iframeEl.setAttribute('src', src)
  
    Object.keys(styleMap).map(prop => {
        iframeEl.style[prop] = styleMap[prop]
    })
  
    hostEl.appendChild(iframeEl)
    return new Promise((resolve, reject) => {
        iframeEl.onload = () => resolve(iframeEl)
        iframeEl.onerror = () => reject(new Error('Could not resolve Promise returned by createIframe'))
    })
}

const postMessage = (target, messageType, messageData) => {
    target.contentWindow.postMessage({ messageType, messageData }, '*')
}

const Playground = () => {
    const iframeContainer = document.querySelector('.IframeContainer')
    const postButton = document.querySelector('.postMessage')
    const containerMessageStatus = document.querySelector('.messageStatus')
    const containerMessageType = document.querySelector('.messageType')
    const containerMessageData = document.querySelector('.messageData')
    const iframe = createIframe(iframeContainer)
  
    iframe.then(domElement => {
        postButton.addEventListener('click', () => {
            postMessage(domElement, 'postMessage', 'message has been received')
        })
        window.addEventListener('message', ({ data: { messageType, messageData }, source}) => {
            containerMessageStatus.innerHTML = `New message received at: ${new Date().toTimeString()}`
            containerMessageType.innerHTML = messageType
            containerMessageData.innerHTML = messageData
        })
    })
}

Playground()
