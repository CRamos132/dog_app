import React from 'react'
import Formulario from '../components/Formulario'
import { render, waitForElement, fireEvent, act } from '@testing-library/react'
import BuscaAtiva from '../classes/BuscaAtiva'
import BuscasDogs from '../classes/BuscasDogs'

describe('O componente de formulário', () => {
    it('Deve avisar se há campos vazios', async () => {
        await act( async () => {
            const { getByTestId, getByText } = render(<Formulario buscas={new BuscasDogs()} buscaAtiva={new BuscaAtiva()} />)
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
            const { getByTestId } = render(<Formulario buscas={(new BuscasDogs())} buscaAtiva={new BuscaAtiva()} />)
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
            const { getByTestId } = render(<Formulario buscas={new BuscasDogs()} buscaAtiva={new BuscaAtiva()} />)
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