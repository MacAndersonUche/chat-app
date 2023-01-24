const socket = io()

const messageForm = document.querySelector("#message-form")
const messageFormInput = document.querySelector("input")
const messageFormButton = document.querySelector("button")
const locationBtn = document.querySelector("#send-location")
const messages = document.querySelector("#messages")

const messageTemplate = document.querySelector("#message-template").innerHTML
const locationTemplate = document.querySelector("#location-template").innerHTML
const sideBarTemplate = document.querySelector("#sidebar-template").innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


const autoScroll = () => {
    //New Message element 
    const newMessage = messages.lastElementChild

    // Height of the new message
    const newMsgStyles = getComputedStyle(newMessage)
    const newMsgMargin = parseInt(newMsgStyles.marginBottom)
    const newMsgHeight = newMessage.offsetHeight + newMsgMargin


    //Visible height 
    const visibleHeight = messages.offsetHeight


    //Height of messages container 
    const containerHeight = messages.scrollHeight

    //How far have i scrolled
    const scrollOffset = messages.scrollTop + visibleHeight

    if (containerHeight - newMsgHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }


}


socket.on("message", (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format("h:mm a")
    })
    messages.insertAdjacentHTML("beforeend", html)
    autoScroll()
})
socket.on("locationMessage", (location) => {
    const html = Mustache.render(locationTemplate, {
        username: location.username ?? "",
        url: location.url ?? "",
        createdAt: moment(location.createdAt).format("h:mm a") ?? 0
    })
    messages.insertAdjacentHTML("beforeend", html)
    autoScroll()
})
socket.on("roomData", ({ room, users }) => {

    const html = Mustache.render(sideBarTemplate, {
        room,
        users
    })
    document.querySelector("#sidebar").innerHTML = html
})



messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    messageFormButton.setAttribute("disabled", "disabled")

    const message = document.querySelector("input").value

    socket.emit("sendMessage", message, (error) => {
        messageFormButton.removeAttribute("disabled")
        messageFormInput.value = ""
        messageFormInput.focus()
        if (error) {
            return console.log(error)
        }

        console.log("Message Delivered");
    })
})

locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) return alert("Geolocation is not supported by your browser")
    locationBtn.setAttribute("disabled", "disabled")
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        socket.emit("sendLocation", { latitude, longitude }, (error) => {
            if (error) {
                return console.log(error)
            }

            console.log("Location  Shared!");
            locationBtn.removeAttribute("disabled")
        })
    })
})

socket.emit("join", { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = "/"
    }
})