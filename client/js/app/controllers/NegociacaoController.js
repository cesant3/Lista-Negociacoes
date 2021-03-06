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

        let service = new NegociacaoService();

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()
        ])
            .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Importação com sucesso'
            })
            .catch(erro => this._mensagem.texto = erro);

        // service.obterNegociacoesDaSemana()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'negociações importadas com sucesso'
        //     })
        //     .cath(erro => this._mensagem.texto = erro);

        // service.obterNegociacoesDaSemanaAnterior()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'negociações importadas com sucesso'
        //     })
        //     .cath(erro => this._mensagem.texto = erro);

        // service.obterNegociacoesDaSemanaRetrasada()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'negociações importadas com sucesso'
        //     })
        //     .cath(erro => this._mensagem.texto = erro);

    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

}