import { TezosToolkit } from "@taquito/taquito";
import config from "../config";
import axios from "axios";

const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var hash = "QmcGRLkvb8b3suagMxrraDzwm6oTXsVEKcrFG2kGUaGW4a";

export const connectWallet = ({ wallet, Tezos }) => {
	return async (dispatch) => {
		try {
			var payload = {};

			Tezos.setWalletProvider(wallet);

			const activeAccount = await wallet.client.getActiveAccount();
			if (!activeAccount) {
				await wallet.requestPermissions({
					network: {
						type: "jakartanet",
						//rpcUrl: "https://jakartanet.smartpy.io/",
					},
				});
			}
			const userAddress = await wallet.getPKH();
			const balance = await Tezos.tz.getBalance(userAddress);

			payload.user = {
				userAddress: userAddress,
				balance: balance.toNumber(),
			};
			dispatch(_walletConfig(payload.user));
		} catch (error) {
			console.log(error);
			dispatch({
				type: "CONNECT_WALLET_ERROR",
			});
		}
	};
};

export const _walletConfig = (user) => {
	return {
		type: "CONNECT_WALLET",
		user,
	};
};

export const disconnectWallet = ({ wallet, setTezos }) => {
	return async (dispatch) => {
		setTezos(new TezosToolkit("https://jakartanet.smartpy.io/"));

		dispatch({
			type: "DISCONNECT_WALLET",
		});

		if (wallet) {
			await wallet.client.removeAllAccounts();
			await wallet.client.removeAllPeers();
			await wallet.client.destroy();
		}
	};
};

export const hex2buf = (hex) => {
	return new Uint8Array(
		hex.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16))
	);
};

export function bytes2Char(hex) {
	return Buffer.from(hex2buf(hex)).toString("utf8");
}

export const fetchData = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(
				`https://api.jakartanet.tzkt.io/v1/contracts/${config.contractAddress}/bigmaps/data/keys`
			);
			const response1 = await axios.get(
				`https://api.jakartanet.tzkt.io/v1/contracts/${config.tokenAddress}/bigmaps/token_metadata/keys`
			);
			const d1 = response.data;
			const d2 = response1.data;
			let tokenData = [];
			for (let i = 0; i < d1.length; i++) {
				const s = bytes2Char(d2[i].value.token_info[""])
					.split("//")
					.at(-1);

				const res = await axios.get("https://ipfs.io/ipfs/" + s);

				const l1 = d1[i].value;
				const l2 = res.data;
				tokenData[i] = {
					...l1,
					...l2,
					token_id: d2[i].value.token_id,
				};
			}
			console.log(tokenData);
			dispatch({ type: "SET_TOKEN_DATA", payload: tokenData });

		} catch (e) {
			console.log(e);
		}
	};
};

export const mintNFT = ({ Tezos, amount, metadata }) => {
	return async (dispatch) => {
		try {
			const contract = await Tezos.wallet.at(config.contractAddress);
			let bytes = "";
			for (var i = 0; i < metadata.length; i++) {
				bytes += metadata.charCodeAt(i).toString(16).slice(-4);
			}
			const op = await contract.methods.mint(amount, bytes).send();
			await op.confirmation();
            dispatch(fetchData());
		} catch (e) {
			console.log(e);
		}
	};
};

export const collectNFT = ({ Tezos, amount, id }) => {
	return async (dispatch) => {
		try {
			const contract = await Tezos.wallet.at(config.contractAddress);

			const op = await contract.methods
				.collect(id)
				.send({ mutez: true, amount: amount });
			await op.confirmation();
            dispatch(fetchData());
		} catch (e) {
			console.log(e);
		}
	};
};


// export const register_org = async ({company_name , company_email}) => {
// 	var jsondata = await fetchText(`https://ipfs.io/ipfs/${ipfs_hash}`);
// 	console.log(jsondata)
// 	console.log(jsondata.length)
// 	var data_len = Object.keys(jsondata).length
// 	console.log(data_len)


// }
