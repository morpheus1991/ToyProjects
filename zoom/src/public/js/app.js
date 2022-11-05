console.log("dd");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("message", message.data);
});
socket.addEventListener("close", () => {
  console.log("Disconnected from server x");
});
