import React from 'react'
import DisplayCadastro from '../components/DisplayCadastro'
import { render } from '@testing-library/react'
import CadastroAtual from '../classes/CadastroAtual'

describe('O componente de display', () => {
    it('Deve estar sincronizado com o objeto de state', () => {
        const cadastro = new CadastroAtual()
        const cadastroAtual = cadastro.getCadastro()
        cadastro.atualizaCadastro({...cadastroAtual, nome: 'Teste'})
        const { getByText } = render(<DisplayCadastro cadastro={cadastro} />)
        expect(getByText('Teste'))
    })
})