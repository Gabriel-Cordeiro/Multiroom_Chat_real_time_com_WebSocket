module.exports.iniciaChat = function(app,req,res)
{
    var dadosForm = req.body;

    req.assert("apelido","Apelido ou nome é obrigatório").notEmpty();
    req.assert("apelido","Apelido ou nome devem conter entre 3 e 15 caracteres").len(3,15)
    
    var erros = req.validationErrors();

    if(erros)
    {
        res.render("index", {validacao: erros});
        return;
    }

    app.get("io").emit("msgparacliente", {
        apelido: dadosForm.apelido,
        mensagem: " Conectou-se"
    });

    res.render("chat", {dadosForm: dadosForm});
}