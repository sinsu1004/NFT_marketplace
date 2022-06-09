import Image from "next/image";
import Anchor from "@ui/anchor";
import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import MarketplaceContext from "src/web3/marketplace-context";
import React, { useContext, useEffect } from 'react';

const UserDropdown = () => {
    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);
    const marketplace_ctx=useContext(MarketplaceContext);

    const logout =() =>{
        metamask.Signout();
    }
    return (
        <div className="icon-box">
            <Anchor path="/author" metadata={metamask}>
                <Image
                    src="/images/icons/boy-avater.png"
                    alt="Images"
                    layout="fixed"
                    width={38}
                    height={38}
                />
            </Anchor>
            <div className="rn-dropdown">
                <div className="rn-inner-top">
                    <h4 className="title">
                        {metamask.userinfo.username !="" ? metamask.userinfo.username : metamask.account }님 환영합니다.
                    </h4>
                    <span>
                        <Anchor path="/product">Set Display Name</Anchor>
                    </span>
                </div>
                <div className="rn-product-inner">
                    <ul className="product-list">
                        {collection_ctx.collection.map((nft,key)=>{

                            return(
                                <li className="single-product-list">
                                <div className="thumbnail">
                                    <Anchor path="/product">
                                        <Image
                                            src={`https://ipfs.infura.io/ipfs/${nft.img}`}
                                            // src='https://ipfs.infura.io/ipfs/QmWnaePrKkS3FpHhdazZEg7fLzR7NkjDMHkaTYv7XXCHS5'
                                            alt="Nft Product Images"
                                            layout="fixed"
                                            width={50}
                                            height={50}
                                            unoptimized={true}
                                        />
                                    </Anchor>
                                </div>
                                <div className="content">
                                    <h6 className="title">
                                        <Anchor path="/product">Balance</Anchor>
                                    </h6>
                                    <span className="price"></span>
                                </div>
                                <div className="button" />
                            </li>  
                            );
                        })}
                    
                    </ul>
                </div>
                <div className="add-fund-button mt--20 pb--20">
                    <Anchor
                        className="btn btn-primary-alta w-100"
                        path="/connect"
                    >
                        Add Your More Funds
                    </Anchor>
                </div>
                <ul className="list-inner">
                    <li>
                        <Anchor path="/author">My Profile</Anchor>
                    </li>
                    <li>
                        <Anchor path="/edit-profile">Edit Profile</Anchor>
                    </li>
                    <li>
                        <button type="button" onClick={logout}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropdown;
