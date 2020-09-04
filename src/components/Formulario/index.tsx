import React, { useState, useEffect } from 'react';
import BuscaApi from '../../repositories/BuscaApi';
import Busca from '../../interfaces/Busca';
import BuscasDogs from '../../classes/BuscasDogs';
import './index.css';
import {
  Typography, TextField, InputLabel, Input, Select, MenuItem, Button,
} from '@material-ui/core';
import BuscaAtiva from '../../classes/BuscaAtiva';

type FormularioProps = {
    buscas: BuscasDogs
    buscaAtiva: BuscaAtiva
}

function Formulario({ buscas, buscaAtiva }: FormularioProps) {
  const [racas, setRacas] = useState([]);
  const [subRaca, setSubraca] = useState([])

  useEffect(() => {
    BuscaApi('https://dog.ceo/api/breeds/list/all')
      .then((dados) => {
        setRacas(dados.message);
      });

    // verifica se há alguma busca no localStorage
    let buscaAtual: any = localStorage.getItem('buscaAtual');
    if (buscaAtual) {
      buscaAtual = JSON.parse(buscaAtual);
      setValores(buscaAtual);
      setSubraca([].concat(buscaAtual.subraca))
    }
  }, []);

  const valoresIniciais: Busca = {
    idade: '',
    nome: '',
    cor: '#000000',
    raca: '',
    subraca: '',
  };

  const [valores, setValores] = useState(valoresIniciais);

  function handleChange(e: any) {
    const campo = e.target.name;
    let valor = e.target.value;

    // factory para aplicar funções extras de validação
    const campos: any = {
      idade(valor: string) {
        let idade = valor.replace(/^[a-zA-Z]+$/, '');
        if (Number(idade) > 15) {
          idade = '15'
        }
        return idade;
      },
      nome(valor: string) {
        const nome = valor;
        if (nome.length > 5) {
          return nome.substr(0, 5);
        }
        return nome;
      },
      raca(valor: any) {

        setSubraca(racas[valor])
        return valor
      }
    };

    const alteracao = campos[campo];
    if (alteracao) {
      valor = alteracao(valor);
    }
    localStorage.setItem('buscaAtual', JSON.stringify(valores));
    
    buscaAtiva.atualizaBusca({...valores, [campo]: valor});
    
    setValores({
      ...valores,
      [campo]: valor,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(valores.raca === '') {
      
      return
    }
    buscas.addBusca(valores);
    localStorage.setItem('buscaAtual', '');
    setValores(valoresIniciais);
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
    </form>
  );
}

export default Formulario;
