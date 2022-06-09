import { useReducer } from "react";
import Metamask_context from "./Metamask_context";


const defaultMetamask ={
    account:null,
    networkId:null,
    connect:false,
    userinfo:{},
};

const Metamask_Reducer=(state,action)=>{
    if(action.type === 'ACCOUNT'){
        return{
            account:action.account,
            networkId:state.networkId,
            connect:true,
            userinfo:state.userinfo,
        };
    }
    if(action.type === 'NETWORKID'){
        return{
            account: state.account,
            networkId: action.networkId,
            connect:state.connect,
            userinfo:state.userinfo,
        };
    }
    if(action.type === 'logout'){
        return{
            account:null,
            networkId:null,
            connect:false,
            userinfo:{},
        };
    }
    if(action.type === 'USERINFO'){
        return{
            account: state.account,
            networkId: state.networkId,
            connect:state.connect,
            userinfo:action.userinfo,
      
        }
      }

    return defaultMetamask;
};

const Metamask_provider=props=>{
    const [metaState,dispatchMetaAction]= useReducer(Metamask_Reducer,defaultMetamask);

    const loadAccountHandler = async(web3) =>{
        const accounts = await web3.eth.getAccounts();
        const account =accounts[0];
        dispatchMetaAction({type:'ACCOUNT',account:account});
        return account;
        
    };
    const loadNetworkIdHandler = async(web3)=>{
        const networkId =await web3.eth.net.getId();
        dispatchMetaAction({type:'NETWORKID',networkId:networkId});
        return networkId;
    };
    const SignoutHandler=async()=>{
        dispatchMetaAction({type:'logout'});
    }
    const loadprofileimgHandler = async(contract)=>{

    };
    const loaduserinfoHandler = async(contract,account)=>{
        const userinf =await contract.methods._user(account).call();
        dispatchMetaAction({type:'USERINFO',userinfo: userinf});
        
      };
       
   

    const metamask_data={
        account:metaState.account,
        networkId:metaState.networkId,
        connect:metaState.connect,
        userinfo:metaState.userinfo,
        loadAccount:loadAccountHandler,
        loadNetworkId:loadNetworkIdHandler,
        Signout:SignoutHandler,
        loaduserinfo:loaduserinfoHandler,
        loadprofileimg:loadprofileimgHandler,
        
    };

    return(
        <Metamask_context.Provider value={metamask_data}>
            {props.children}
        </Metamask_context.Provider>
    );

};
export default Metamask_provider;