import React from 'react';
import { Fragment } from 'react';
import logo from '../../assets/logo.svg';
import './Header.css'

export default function Header(){
    return(
        <div>
            <div  className="header" >
            <img  className="logo" src = {logo}  alt="Logo"/>
            </div>
        </div>

    )
}

