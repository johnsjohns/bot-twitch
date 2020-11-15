const conexao = require('../db/conexao');

class Usuarios{
    adiciona(usuario){
        const sql = `INSERT INTO usuarios SET ?`
        conexao.query(sql, usuario, (erro, resultados) => {
            if(erro){
                console.log(erro);
            } else {    
                console.log(`${usuario.cliente} usuario adicionado`);
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

    altera(id, valor, res){
        const sql = "UPDATE usuarios SET ? WHERE id = ?";
        conexao.query(sql,[valor, id], (erro, resultado) => {
            if(erro){
                return res(erro);
            } else {
                return res();
            }
        })
    }

    reset(){
        const sql = "UPDATE usuarios SET status = 'off'";
        conexao.query(sql,(erro, resultado) =>{
            if(erro){
                console.log(erro);
            }
        });
    } 
}

module.exports = new Usuarios();