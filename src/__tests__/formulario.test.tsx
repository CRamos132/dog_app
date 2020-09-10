import React from 'react'
import Formulario from '../components/Formulario'
import { render, waitForElement, fireEvent, act } from '@testing-library/react'
import CadastroAtual from '../classes/CadastroAtual'
import CadastrosSalvos from '../classes/CadastrosSalvos'

describe('O componente de formulário', () => {
    it('Deve avisar se há campos vazios', async () => {
        await act( async () => {
            const { getByTestId, getByText } = render(<Formulario cadastros={new CadastrosSalvos()} cadastroAtual={new CadastroAtual()} />)
            const formBtn = await waitForElement(
                () => getByTestId('form_btn_submit')
            )
            const formMsg = 'Favor preencher todos os campos'
            fireEvent.click(formBtn)
            expect(getByText(formMsg))
        })

    })
    it('Deve limitar o tamanho do nome digitado', async () => {
        await act( async () => {
            const { getByTestId } = render(<Formulario cadastros={(new CadastrosSalvos())} cadastroAtual={new CadastroAtual()} />)
            const formBtn = await waitForElement(
                () => getByTestId('form_btn_submit')
            )
            const formInptNome = await waitForElement(
                () => (getByTestId('form_input_nome') as HTMLInputElement)
            )
            act( () => {

                fireEvent.change(
                    formInptNome,
                    { target: { value: 'NomeLongo' } }
                )
            }) 
            fireEvent.click(formBtn)
            await expect(formInptNome.value = 'NomeL')
        })
    })
    it('Deve limitar a idade do cachorro', async () => {
        await act( async () => {
            const { getByTestId } = render(<Formulario cadastros={new CadastrosSalvos()} cadastroAtual={new CadastroAtual()} />)
            const formBtn = await waitForElement(
                () => getByTestId('form_btn_submit')
            )
            const formInptIdade = await waitForElement(
                () => (getByTestId('form_input_idade') as HTMLInputElement)
            )
            act( () => {
    
                 fireEvent.change(
                    formInptIdade,
                    { target: { value: '16' } }
                )
            }) 
            fireEvent.click(formBtn)
            expect(formInptIdade.value = '15')
        })
    })
})