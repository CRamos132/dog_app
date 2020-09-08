import React from 'react'
import DisplayBusca from '../components/DisplayBusca'
import { render } from '@testing-library/react'
import BuscaAtiva from '../classes/BuscaAtiva'

describe('O componente de display', () => {
    it('Deve estar sincronizado com o objeto de state', () => {
        const busca = new BuscaAtiva()
        const buscaAtual = busca.getBusca()
        busca.atualizaBusca({...buscaAtual, nome: 'Teste'})
        const { getByText } = render(<DisplayBusca busca={busca} />)
        expect(getByText('Teste'))
    })
})