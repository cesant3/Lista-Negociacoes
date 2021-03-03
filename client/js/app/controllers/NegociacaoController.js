class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona',
            'esvazia'
        )

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto'
        )

    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!";
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso!';
        this._limpaFormulario();
    }

    importaNegociacoes() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    JSON.parse(xhr.responseText)
                        .map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
                        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                } else {
                    console.log(xhr.responseText);
                }
            }
        }

        xhr.send();        
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}