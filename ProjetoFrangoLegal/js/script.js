class Venda {

    constructor() {
        this.id = 1;
        this.arrayVendas = [];
        this.editId = null;
    }

    salvar() {
        let venda = this.lerDados();

        if(this.validaCampos(venda) == true) {
            if(this.editId == null) {
                this.adicionar(venda);
            }
            else {
                this.atualizar(this.editId, venda);
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayVendas.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_cliente = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayVendas[i].id;
            td_cliente.innerText = this.arrayVendas[i].nomeCliente;
            td_produto.innerText = this.arrayVendas[i].nomeProduto;
            td_valor.innerText = this.arrayVendas[i].preco;

            td_id.classList.add('center');
            td_valor.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edite.png';
            imgEdit.setAttribute("onclick", "venda.preparaEditacao("+ JSON.stringify(this.arrayVendas[i]) +")")

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/deletar.png';
            imgDelete.setAttribute("onclick", "venda.deletar("+ this.arrayVendas[i].id +")")
            
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(venda) {
        this.arrayVendas.push(venda);
        this.id++;
    }

    atualizar(id, venda) {
        for(let i = 0; i < this.arrayVendas.length; i++) {
            if(this.arrayVendas[i].id == id) {
                this.arrayVendas[i].nomeCliente = venda.nomeCliente;
                this.arrayVendas[i].nomeProduto = venda.nomeProduto;
                this.arrayVendas[i].preco = venda.preco;
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;

        document.getElementById('cliente').value = dados.nomeCliente;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados() {
        let venda = {}

        venda.id = this.id;
        venda.nomeCliente = document.getElementById('cliente').value;
        venda.nomeProduto = document.getElementById('produto').value;
        venda.preco = document.getElementById('preco').value;

        return venda;
    }

    validaCampos(venda) {
        let msg = '';

        if(venda.nomeCliente == '') {
            msg += '- Informe o nome do cliente \n';
        }
        if(venda.nomeProduto == '') {
            msg += '- Selecione um produto \n'
        }
        if(venda.preco == '') {
            msg += '- Informe o preço do produto'
        }
        if(msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('cliente').value = '';
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {
        if(confirm('Deseja realmente deletar o produto do ID ' + id + '?')) {
            let tbody = document.getElementById('tbody');

            for(let i = 0; i < this.arrayVendas.length; i++) {
            if(this.arrayVendas[i].id == id) {
                this.arrayVendas.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        }
        
    }

}

var venda = new Venda();