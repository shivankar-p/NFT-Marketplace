import React,{ useState, useEffect } from 'react';
import Header from './sections/Header';
import { useDispatch } from 'react-redux';
import { TezosToolkit} from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
  ColorMode
} from "@airgap/beacon-sdk";

import { fetchData, _walletConfig } from '../actions';
import { Route, Switch } from 'react-router';
import Home from './layouts/Home';
import Create from './layouts/Create';
import Show from './layouts/Show';
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const App = () => {
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

    var listhashes = [];
    var ipfs_hash="";
     ipfs.addJSON({ somevalue: 2, name: 'Nick' }).then(async (result) => {
        // listhashes.append(result);
        console.log(result);
        ipfs_hash = result;
        const messageString = await fetchText(`https://ipfs.io/ipfs/${ipfs_hash}`);
        console.log(messageString)
     })

    // ipfs.catJSON('QmYzWWCvYhqU6d5VvRvVwgbpqM9J3HH8TMbns9UvFSSvBf').then(console.log).catch(console.log);
    // fetch("https://ipfs.io/ipfs/"+ipfs_hash)
    // sleep(1)
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // await new Promise(r => setTimeout(r, 1000));
    sleep(1000)
    console.log(ipfs_hash)
    
    async function fetchText(url) {
        const response = await fetch(url);
        return response.text();
    }

    

    // message = await fetch("https://ipfs.io/ipfs/QmYzWWCvYhqU6d5VvRvVwgbpqM9J3HH8TMbns9UvFSSvBf");


    
    return (
        <div className="ui container">
            <Header Tezos={Tezos} setTezos={setTezos} wallet={wallet} />
            <div className="ui container">
                <Switch>
                    <Route path="/create">
                        <Create Tezos={Tezos}/>
                    </Route>
                    <Route path="/show/:id">
                        <Show Tezos={Tezos}/>
                    </Route>
                    <Route path="/">
                        <Home Tezos={Tezos}/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;