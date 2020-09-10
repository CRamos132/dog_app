import React from 'react'
import Carrossel from '../components/Carrossel'
import { render } from '@testing-library/react'
import CadastrosSalvos from '../classes/CadastrosSalvos'

describe('O componente de carrossel', () => {
    it('Deve mostrar a quantidade certa de cadastros salvos', () => {
        const cadastros = new CadastrosSalvos()
        const mockCAdastro = {nome: 'teste', idade: '10', raca: 'teste', subraca: '', cor: '#FFFFF'}
        const cadastroString = JSON.stringify([mockCAdastro])
        localStorage.setItem('cadastros', cadastroString)
        const componente = render(<Carrossel cadastrosSalvos={cadastros} />)
        expect(cadastros.getCadastros()).toHaveLength(1)
    })
})