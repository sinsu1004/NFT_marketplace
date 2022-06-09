import React from "react";

const Metamask_context =React.createContext({
    account:null,
    networkId:null,
    connect:false,
    userinfo:{},
    loadAccount:()=>{},
    loadNetworkId:()=>{},
    Signout:()=>{},
    loadprofileimg:()=>{},
    loaduserinfo:()=>{},
});








export default Metamask_context;