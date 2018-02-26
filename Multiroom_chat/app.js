var app = require("./config/server");

var server = app.listen(8080, function () {
    console.log("Servidor online");
});

var io = require('socket.io').listen(server);
app.set("io", io);

/*Criar a conexão por websocket */
io.on("connection", function (socket) {
    console.log("Usuário conectou");

    socket.on("disconnect", function () {
        console.log("usuário desconectou");
    })

    socket.on("msgParaServidor", function (data) {

        /* dialogo */
        socket.emit("msgparacliente",
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            });

        socket.broadcast.emit("msgparacliente",
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            });

            /* participantes */

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
           
            socket.emit("participantesParaCliente",
                {
                    apelido: data.apelido,
                });

            socket.broadcast.emit("participantesParaCliente",
                {
                    apelido: data.apelido,
                });
        }
    });
});