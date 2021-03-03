class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('não foi possivel obter as negociacoes da semana')
                })

        })
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('não foi possivel obter as negociacoes da semana anterior')
                })

        })

    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('não foi possivel obter as negociacoes da semana retrasada')
                })

        })
    }

}