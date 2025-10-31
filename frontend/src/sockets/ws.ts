const socketUrl = import.meta.env.VITE_SOCKET_URL;
export const sockets = new WebSocket(socketUrl);
// export const sockets = new WebSocket('ws://localhost:8080');