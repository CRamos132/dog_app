// checa status da resposta
function isOk(res: Response) {
  if (res.ok) {
    return res;
  }
  throw new Error(`Algo deu errado: ${res.statusText}`);
}

function BuscaApi(urlConfig: string) {
  return fetch(urlConfig)
    .then(async (resposta: Response) => {
      if (isOk(resposta)) {
        return resposta;
      }
      throw new Error('Algo deu errado');
    })
    .then((res) => res.json());
}

export default BuscaApi;
