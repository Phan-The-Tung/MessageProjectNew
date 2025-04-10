import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formMessage = document.querySelector(".chat .inner-form");
if (formMessage) {
    formMessage.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        console.log("content");
        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";

            clearTimeout(timeOut);
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    });
}
// End CLIENT_SEND_MESSAGE