import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 8080 });



wss.on('connection',(ws : WebSocket)=>{
    ws.on('error',console.error);
    
    ws.on('message',function Message(data,isBinary){
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary : isBinary})
            }
        })
    });

    

    ws.send("Hello from Socket Server..!");

})