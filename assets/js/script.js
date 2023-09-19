class Produto {

    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            }else {
                this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela()
        this.cancelar()
    }

    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++ ){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            
            // Formatando o preço como moeda brasileira
            td_valor.innerText = this.formatarMoeda(this.arrayProdutos[i].preco);
        
            td_id.classList.add('center');

            let imgEdit = document.createElement('img')
            imgEdit.src = 'assets/images/edit.png'
            imgEdit.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

            td_acoes.appendChild(imgEdit);
            // <td> <img\> <\td>

            let imgDelete = document.createElement('img')
            imgDelete.src = 'assets/images/excluir.png'
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")")

            td_acoes.appendChild(imgDelete);
        }
    
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++ ){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id

        document.getElementById('nome-produto').value = dados.nomeProduto;
        document.getElementById('valor-produto').value = dados.preco;
    
        document.getElementById('btn-atualizar').innerText = 'Atualizar'
    }

    lerDados = () => {

        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('nome-produto').value;
        produto.preco = document.getElementById('valor-produto').value;

        return produto;
    }

    validaCampos(produto){
        let msg = ''

        if(produto.nomeProduto == ''){
            msg += 'informe o nome do produto\n'
        }

        if(produto.preco == ''){
            msg += 'informe o preço do produto\n'
        }

        if(msg != ''){
            alert(msg);
            return false
        }

        return true;
    }

    cancelar(){
        document.getElementById('nome-produto').value = '';
        document.getElementById('valor-produto').value = '';
    
        document.getElementById('btn-atualizar').innerText = 'Salvar'
        this.editId = null;
        
    }

    deletar(id){
        if(confirm('Deseja realmente deletar o produto do ID' + id)){
            let tbody = document.getElementById('tbody');
        
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1)
                tbody.deleteRow(i);
            }
        }
        }
        
    }

    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
}

let produto = new Produto()