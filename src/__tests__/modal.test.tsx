import React from 'react'
import Modal from '../components/Modal'
import { render } from '@testing-library/react'

describe('O modal', () => {
    it('Deve mostrar corretamente os valores passados', () => {
        const modalInicial = {
            aberto: true,
            texto: 'Este é um teste',
            extra: () => {}
        }
        const altera = () => {
            return
        }
        const { getByTestId } = render(<Modal altera={altera} valoresIniciais={modalInicial} modal={modalInicial} />)
        expect(getByTestId('modal_txt').innerHTML).toContain('Este é um teste')
    })
})