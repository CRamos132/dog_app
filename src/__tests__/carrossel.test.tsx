import React from 'react'
import Carrossel from '../components/Carrossel'
import { render } from '@testing-library/react'
import BuscasDogs from '../classes/BuscasDogs'

describe('O componente de carrossel', () => {
    it('Deve mostrar a quantidade certa de buscas salvas', () => {
        const buscas = new BuscasDogs()
        const mockBusca = {nome: 'teste', idade: '10', raca: 'teste', subraca: '', cor: '#FFFFF'}
        const buscaString = JSON.stringify([mockBusca])
        localStorage.setItem('buscas', buscaString)
        const componente = render(<Carrossel buscasSalvas={buscas} />)
        expect(buscas.getBuscas()).toHaveLength(1)
    })
})