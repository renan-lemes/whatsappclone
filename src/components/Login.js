import React from 'react';
import './Login.css';
import Api from '../Api';

export default ({onReceive}) => {
    const hadleFacebookLogin = async () => {
        let result = await Api.fbPopup();
        if(result){
            onReceive(result.user);
        }else{
            alert("Erro!");
        }
    }
    
    return(
        <div className="login">
            <button onClick={hadleFacebookLogin}>Logar com o Facebook</button>
        </div>
    );
}