const conexao = require('../db/conexao');

class Usuarios{
    adiciona(usuario){
        const sql = `INSERT INTO usuarios SET ?`
        conexao.query(sql, usuario, (erro, resultados) => {
            if(erro){
                console.log(erro);
            } else {    
                console.log('novo usuario adicionado');
            }
        })
    }

    listaByName(usuario, res){
       
        const sql = `SELECT * FROM usuarios WHERE cliente = "${usuario}"`;
        conexao.query(sql, (erro, resultado) => {
            if(erro){
               return res(erro);   
            }    
            return res(resultado[0]);
            }
        )
    }
}

module.exports = new Usuarios();