import React, { useState, useEffect } from 'react';
import {
  Typography, TextField, InputLabel, Input, Select, MenuItem, Button,
} from '@material-ui/core';
import BuscaApi from '../../repositories/BuscaApi';
import Cadastro from '../../interfaces/Cadastro';
import CadastrosSalvos from '../../classes/CadastrosSalvos';
import './index.css';
import CadastroAtual from '../../classes/CadastroAtual';
import Modal from '../Modal';

type FormularioProps = {
    cadastros: CadastrosSalvos
    cadastroAtual: CadastroAtual
}

function Formulario({ cadastros, cadastroAtual }: FormularioProps) {
  const valoresIniciais: Cadastro = {
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
  const [valores, setValores] = useState<Cadastro>(valoresIniciais);
  const [modal, setModal] = useState(modalInicial);

  /**
   * Retorna uma URL de imagem
   * @param cadastro
   */
  function selecionaImagem(cadastro: Cadastro) {
    let urlImgA = 'https://dog.ceo/api/breeds/image/random';
    if (cadastro.raca && cadastro.raca !== '') {
      urlImgA = `https://dog.ceo/api/breed/${cadastro.raca}`;
      if (cadastro.subraca !== '') {
        urlImgA += `/${cadastro.subraca}`;
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

  /**
   * Cria um novo state com uma imagem baseada no cadastro passado
   * @param stateAtual 
   */
  function novoStateImg(stateAtual: Cadastro) {
    return selecionaImagem(stateAtual)
      .then((dado) => {
        const stateN: Cadastro = { ...stateAtual, urlImg: dado };
        return stateN;
      })
      .catch((res: Response) => {
        alert('Algo deu errado, favor tentar novamente');
        console.log(res.text)
      });
  }
  useEffect(() => {
    BuscaApi('https://dog.ceo/api/breeds/list/all')
      .then((dados) => {
        setRacas(dados.message);
      })
      .catch((res: Response) => {
        alert('Algo deu errado, favor tentar novamente');
        console.log(res.text)
      });
    cadastroAtual.subscribe(setValores);
    let stateInicial = valoresIniciais
    // verifica se há algum cadastro no localStorage
    const cadastroString = localStorage.getItem('cadastroAtual');
    if (cadastroString) {
      stateInicial = JSON.parse(cadastroString);
    }
    setSubraca([stateInicial.subraca]);
    attState(stateInicial);
  }, []);

  /**
   * Atualiza o state e salva o cadastro no localStorage
   * @param state 
   */
  function attState(state: Cadastro) {
    localStorage.setItem('cadastroAtual', JSON.stringify(state));
    cadastroAtual.atualizaCadastro(state);
  }

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
  const salvaCadastro = () => {
    const novoCadastro = cadastroAtual.getCadastro();
    cadastros.addCadastro(novoCadastro);
    setValores(valoresIniciais);
    attState(valoresIniciais);
  };

  /**
   * Faz validações do envio do formulário
   * @param e 
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    let modalState = { aberto: true, extra: salvaCadastro, texto: 'Cachorro cadastrado com sucesso' };
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
        inputProps={{ "data-testid": "form_input_nome" }}
      />

      <TextField
        id="form_idade"
        name="idade"
        value={valores.idade}
        label="Idade do cachorro"
        fullWidth
        margin="normal"
        onChange={handleChange}
        inputProps={{ "data-testid": "form_input_idade" }}
      />

      <InputLabel id="form_cor_label" className="form_item">Cor</InputLabel>
      <Input
        id="form_cor"
        name="cor"
        value={valores.cor}
        fullWidth
        type="color"
        onChange={handleChange}
        inputProps={{ "data-testid": "form_input_cor" }}
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
        inputProps={{ "data-testid": "form_select_raca" }}
      >
        <MenuItem value="" className="menuItem">Selecione uma raça</MenuItem>
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
        inputProps={{ "data-testid": "form_select_subraca" }}
      >
        {subRaca.map((subraca: string, index: number) => <MenuItem key={index} value={subraca} className="menuItem">{subraca}</MenuItem>)}

      </Select>

      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        className="form_item" 
        fullWidth 
        data-testid="form_btn_submit"
      >
        Encomendar
      </Button>
      <Modal modal={modal} altera={setModal} valoresIniciais={modalInicial} />
    </form>
  );
}

export default Formulario;
