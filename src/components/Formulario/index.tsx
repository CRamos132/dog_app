import React, { useState, useEffect } from 'react';
import {
  Typography, TextField, InputLabel, Input, Select, MenuItem, Button,
} from '@material-ui/core';
import BuscaApi from '../../repositories/BuscaApi';
import Busca from '../../interfaces/Busca';
import BuscasDogs from '../../classes/BuscasDogs';
import './index.css';
import BuscaAtiva from '../../classes/BuscaAtiva';
import Modal from '../Modal';

type FormularioProps = {
    buscas: BuscasDogs
    buscaAtiva: BuscaAtiva
}

function Formulario({ buscas, buscaAtiva }: FormularioProps) {
  const valoresIniciais: Busca = {
    idade: '',
    nome: '',
    cor: '#000000',
    raca: '',
    subraca: '',
    urlImg: 'https://images.dog.ceo/breeds/mountain-swiss/n02107574_1051.jpg',
    valor: 0,
  };
  const modalInicial = { aberto: false, texto: 'Favor preencher todos os campos', extra: () => {} };
  const [racas, setRacas] = useState([]);
  const [subRaca, setSubraca] = useState<string[]>([]);
  const [valores, setValores] = useState<Busca>(valoresIniciais);
  const [modal, setModal] = useState(modalInicial);

  //retorna uma URL de imagem
  function selecionaImagem(buscaS: Busca) {
    let urlImgA = 'https://dog.ceo/api/breeds/image/random';
    if (buscaS.raca && buscaS.raca !== '') {
      urlImgA = `https://dog.ceo/api/breed/${buscaS.raca}`;
      if (buscaS.subraca !== '') {
        urlImgA += `/${buscaS.subraca}`;
      }
      urlImgA += '/images';
    }

    return BuscaApi(urlImgA)
      .then((dados) => {
        const imagens = [].concat(dados.message);
        const imagemAleatoria = imagens[Math.floor(Math.random() * imagens.length)];
        return imagemAleatoria;
      });
  }

  // cria um novo state com uma imagem baseada na busca atual
  function novoStateImg(stateAtual: Busca) {
    return selecionaImagem(stateAtual)
      .then((dado) => {
        const stateN: Busca = { ...stateAtual, urlImg: dado };
        return stateN;
      });
  }
  useEffect(() => {
    BuscaApi('https://dog.ceo/api/breeds/list/all')
      .then((dados) => {
        setRacas(dados.message);
      });
    buscaAtiva.inscrever(setValores);
    let stateInicial = valoresIniciais
    // verifica se há alguma busca no localStorage
    const buscaString = localStorage.getItem('buscaAtual');
    if (buscaString) {
      stateInicial = JSON.parse(buscaString);
    }
    setSubraca([stateInicial.subraca]);
    attState(stateInicial);
  }, []);

  // atualiza o state e salva a busca no localStorage
  function attState(state: Busca) {
    localStorage.setItem('buscaAtual', JSON.stringify(state));
    buscaAtiva.atualizaBusca(state);
  }

  // é passado any para pode lidar com evento de input e de select
  async function handleChange(e: any) {
    const campo: string = e.target.name;
    const input: string = e.target.value;
    let tempState = valores;

    // strategy para aplicar funções extras de validação
    const campos: any = {
      idade(valor: string) {
        let novaIdade = valor.replace(/^[a-zA-Z]+$/, '');
        if (Number(novaIdade) > 15) {
          novaIdade = '15';
        }
        const novoState = { ...valores, idade: novaIdade };
        return novoState
      },
      nome(valor: string) {
        let novoNome = valor;
        if (novoNome.length > 5) {
          novoNome = novoNome.substr(0, 5);
        }
        const novoState = { ...valores, nome: novoNome };
        return novoState;
      },
      raca(valor: any) {
        setSubraca(racas[valor]);
        const novoState = { ...valores, raca: valor, subraca: '' };
        return novoStateImg(novoState);
      },
      subraca(valor: any) {
        const novoState = { ...valores, subraca: valor };
        return novoStateImg(novoState);
      },
    };

    const alteracao = campos[campo];
    if (alteracao) {
      tempState = await alteracao(input);
    } else {
      tempState = { ...valores, [campo]: input };
    }

    attState(tempState);
  }
  const adicionaBusca = () => {
    const novaBusca = buscaAtiva.getBusca();
    buscas.addBusca(novaBusca);
    setValores(valoresIniciais);
    attState(valoresIniciais);
    setModal({ ...modal, aberto: true, texto: 'Busca adicionada com sucesso' });
  };

  // faz validação do envio do formulário
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    let modalState = { aberto: true, extra: adicionaBusca, texto: 'Cachorro cadastrado com sucesso' };
    e.preventDefault();
    if (valores.raca === '' || valores.idade === '' || valores.nome === '') {
      modalState = { ...modal, aberto: true };
    }
    setModal(modalState);
  }

  return (
    <form onSubmit={handleSubmit} className="form_main">
      <Typography variant="h4" component="h1" align="center">Formulário de cadastro</Typography>

      <TextField
        id="form_nome"
        name="nome"
        value={valores.nome}
        label="Nome do cachorro"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        id="form_idade"
        name="idade"
        value={valores.idade}
        label="Idade do cachorro"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <InputLabel id="form_cor_label" className="form_item">Cor</InputLabel>
      <Input
        id="form_cor"
        name="cor"
        value={valores.cor}
        fullWidth
        type="color"
        onChange={handleChange}
      />

      <InputLabel id="form_raca_label" className="form_item">Raça</InputLabel>
      <Select
        labelId="form_raca_label"
        id="form_raca"
        name="raca"
        fullWidth
        className="menuItem"
        value={valores.raca}
        onChange={handleChange}
      >
        {Object.keys(racas).map((raca: string, index: number) => <MenuItem key={index} value={raca} className="menuItem">{raca}</MenuItem>)}
      </Select>

      <InputLabel id="form_subraca_label" className="form_item">Sub-raça</InputLabel>
      <Select
        labelId="form_subraca_label"
        id="form_subraca"
        name="subraca"
        fullWidth
        className="menuItem"
        value={valores.subraca}
        onChange={handleChange}
      >
        {subRaca.map((subraca: string, index: number) => <MenuItem key={index} value={subraca} className="menuItem">{subraca}</MenuItem>)}

      </Select>

      <Button variant="contained" color="primary" type="submit" className="form_item" fullWidth>
        Encomendar
      </Button>
      <Modal modal={modal} altera={setModal} valoresIniciais={modalInicial} />
    </form>
  );
}

export default Formulario;
