class NegociacaoService {

    obterNegociacoesDaSemana() {
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

}