import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connectWallet, disconnectWallet } from '../../actions';

const Header = ({Tezos, wallet, setTezos}) => {
    const selector = useSelector(state => {return state.walletConfig.user});
    const dispatch = useDispatch();
    const history = useHistory();
    const onClick = (event) => {
        event.preventDefault();
        if(selector.userAddress===""){
            dispatch(connectWallet({Tezos, wallet}));
        }else{
            dispatch(disconnectWallet({wallet, setTezos}));
        }
    }

    return (
            <div className="ui menu black" style={{'marginTop':'5px'}}>
                <a href="/" className="ui header item">OpenLake</a>
                <a href="/" className="item">Home</a>

                
                <a href="/create" className="item">Create NFT</a>
                
                <a href="/contests" className="item">Contests</a>
                
                


                <div className="right menu">
                    {(selector.userAddress==="")?
                    <a href="/#" className="item" onClick={onClick}>Connect Wallet</a>:
                    <a href="/#" className="item" onClick={onClick}>Disconnect Wallet</a>}
                </div>
            </div>
        );
}

export default Header;