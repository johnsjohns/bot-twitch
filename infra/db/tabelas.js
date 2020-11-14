class Tabelas{
    init(conexao){
        this.conexao = conexao;
        this.criar();
    }

    criar(){
        const sql = 'CREATE TABLE IF NOT EXISTS usuarios (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) not null, status varchar(50), pontos int not null, PRIMARY KEY(id))';

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro);
            }
            else {
                console.log('Tabelas prontas!!!!');
            }
        });
    }
}

module.exports = new Tabelas;