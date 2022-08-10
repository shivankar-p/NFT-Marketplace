import React,{ useState, useEffect } from 'react';
import Header from '../sections/Header';
import { useDispatch } from 'react-redux';
import { TezosToolkit} from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
  ColorMode
} from "@airgap/beacon-sdk";

import { fetchData, _walletConfig } from '../../actions';
import { Routes, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Show from './Show';
import Contests from './Contests';

const User = () => {
    const dispatch = useDispatch();
    const [Tezos, setTezos] = useState(
        new TezosToolkit("https://jakartanet.smartpy.io/")
    );
    const [wallet, setWallet] = useState(null);

    useEffect(()=>{
        (async () => {
            const wallet_instance = new BeaconWallet({
                name: "NFT marketplace",
                preferredNetwork: NetworkType.JAKARTANET,
                colorMode: ColorMode.LIGHT,
                disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
                eventHandlers: {
                // To keep the pairing alert, we have to add the following default event handlers back
                [BeaconEvent.PAIR_INIT]: {
                    handler: defaultEventCallbacks.PAIR_INIT
                },
                [BeaconEvent.PAIR_SUCCESS]: {
                    handler: data => { return (data.publicKey);}
                }
                }
            });
            Tezos.setWalletProvider(wallet_instance);
            const activeAccount = await wallet_instance.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet_instance.getPKH();
                const balance = await Tezos.tz.getBalance(userAddress);
                dispatch(_walletConfig(
                    {
                        userAddress: userAddress, 
                        balance: balance.toNumber()
                    }));
            }
            setWallet(wallet_instance);
        })();
    },[Tezos, dispatch]);


    useEffect(()=>{
        dispatch(fetchData());
    },[Tezos, dispatch]);

    return (
        <div className="ui container">
            <Header Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
            <div className="ui container">
                <Switch>
                    <Route path="/user/contests">
                        <Contests Tezos={Tezos}/>
                    </Route>
                    <Route path="/user/create">
                        <Create Tezos={Tezos}/>
                    </Route>
                    <Route path="/user/show/:id">
                        <Show Tezos={Tezos}/>
                    </Route>
                    <Route path="/user">
                        <Home Tezos={Tezos}/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default User;