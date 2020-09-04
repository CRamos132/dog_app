import React from 'react';
import './index.css';
import { Container, Typography } from '@material-ui/core';
import Busca from '../../interfaces/Busca';

type MiniaturaProps = {
    busca: Busca
}
function Miniatura({ busca }: MiniaturaProps) {

    return (
        <Container className="miniatura_main">
            <div className="miniatura_flex_item">
                <h1>{busca.nome}</h1>
                <div className="miniatura_color" style={{backgroundColor: busca.cor}}></div>
                <Typography className="miniatura_cap">{busca.raca}</Typography>
                <Typography className="miniatura_cap">{busca.subraca}</Typography>
                <Typography>{busca.idade}</Typography>
            </div>
            <div className="miniatura_flex_item">
                <img className="miniatura_img" alt="Foto de um cachorro" src='https:\/\/images.dog.ceo\/breeds\/hound-afghan\/n02088094_1003.jpg'/>
            </div>
        </Container>
    )
}

export default Miniatura