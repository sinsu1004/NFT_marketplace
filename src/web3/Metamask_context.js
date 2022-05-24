import React from "react";

const Metamask_context =React.createContext({
    account:null,
    networkId:null,
    connect:false,
    loadAccount:()=>{},
    loadNetworkId:()=>{},
    Signout:()=>{},
});








export default Metamask_context;