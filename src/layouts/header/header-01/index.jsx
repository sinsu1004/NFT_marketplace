import PropTypes from "prop-types";
import clsx from "clsx";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import MobileMenu from "@components/menu/mobile-menu";
import SearchForm from "@components/search-form/layout-01";
import FlyoutSearchForm from "@components/search-form/layout-02";
import UserDropdown from "@components/user-dropdown";
import ColorSwitcher from "@components/color-switcher";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { useOffcanvas, useSticky, useFlyoutSearch } from "@hooks";
import headerData from "../../../data/general/header-01.json";
import menuData from "../../../data/general/menu-01.json";

import Web3 from 'web3';
import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import MarketplaceContext from "src/web3/marketplace-context";
import NFTCollection from 'truffle/abis/NFTCollection.json';
import NFTMarketplace from 'truffle/abis/NFTMarketplace.json';
import { useContext,useEffect,useState } from "react";

var check_one=false;

const Header = ({ className }) => {
   
    const sticky = useSticky();
    const { offcanvas, offcanvasHandler } = useOffcanvas();
    const { search, searchHandler } = useFlyoutSearch();
    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);
    const marketplace_ctx=useContext(MarketplaceContext);
    const [web3,setweb3] =useState();
    //NFT 발행 contract 연결 함수
    const loadBlockchainData =async() =>{

        //NFT contract 연결
        const nftDeployedNetwork=NFTCollection.networks[metamask.networkId];
        const nftContract = collection_ctx.loadContract(web3,NFTCollection,nftDeployedNetwork);
        //NFT marketplace contract 연결
        const mktDeployedNetwork=NFTMarketplace.networks[metamask.networkId];
        const mktContract = marketplace_ctx.loadContract(web3,NFTMarketplace,mktDeployedNetwork);
        
        if(nftContract){
            // 토큰 총량 불러오기
            const totalSupply= await collection_ctx.loadTotalSupply(nftContract);
            // 토큰 정보 모두 불러오기
            collection_ctx.loadCollection(nftContract,totalSupply);
            // 토큰 오너 변동 감지
            nftContract.events.Transfer()
            .on('data', (event) => {
                collection_ctx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
                collection_ctx.setNftIsLoading(false);
            })
            .on('error', (error) => {
                console.log(error);
            });
        }
        if(mktContract){
            // 마켓에 있는 토큰 총개수 불러오기
            const offercount=await marketplace_ctx.loadOfferCount(mktContract);
            // 마켓주문 정보 불러오기
            marketplace_ctx.loadOffers(mktContract,offercount);
            // 사용자 판매금액 불러오기
            metamask.account && marketplace_ctx.loadUserFunds(mktContract,metamask.account);


        }



    }
    if(metamask.networkId != null && metamask.account!=null && check_one==false){
        loadBlockchainData();
        check_one=true;
    }
    useEffect(() => {
        setweb3(window.ethereum ? new Web3(window.ethereum) : null);
    },[] )
  
    const connect_meta =async() =>{
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' }); 
            // const web3=window.ethereum? new Web3(window.ethereum) :null;
            await metamask.loadAccount(web3);
            await metamask.loadNetworkId(web3); 
            
           
        }catch(error) {
            console.error(error);
        }
        

    };
    console.log(collection_ctx);

    return (
        <>
            <header
                className={clsx(
                    "rn-header haeder-default black-logo-version header--fixed header--sticky",
                    sticky && "sticky",
                    className
                )}
            >
                <div className="container">
                    <div className="header-inner">
                        <div className="header-left">
                            <Logo logo={headerData.logo} />
                            <div className="mainmenu-wrapper">
                                <nav
                                    id="sideNav"
                                    className="mainmenu-nav d-none d-xl-block"
                                >
                                    <MainMenu menu={menuData} />
                                </nav>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="setting-option d-none d-lg-block">
                                <SearchForm />
                            </div>
                            <div className="setting-option rn-icon-list d-block d-lg-none">
                                <div className="icon-box search-mobile-icon">
                                    <button
                                        type="button"
                                        aria-label="Click here to open search form"
                                        onClick={searchHandler}
                                    >
                                        <i className="feather-search" />
                                    </button>
                                </div>
                                <FlyoutSearchForm isOpen={search} />
                            </div>

                            {!metamask.connect && (
                                <div className="setting-option header-btn">
                                    <div className="icon-box">
                                        <Button
                                            color="primary-alta"
                                            className="connectBtn"
                                            size="small"
                                            onClick={() => connect_meta()}
                                        >
                                            Wallet connect
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {metamask.connect && (
                                <div className="setting-option rn-icon-list user-account">
                                    <UserDropdown />
                                </div>
                            )}
                            <div className="setting-option rn-icon-list notification-badge">
                                <div className="icon-box">
                                    <Anchor path={headerData.activity_link}>
                                        <i className="feather-bell" />
                                        <span className="badge">0</span>
                                    </Anchor>
                                </div>
                            </div>
                            <div className="setting-option mobile-menu-bar d-block d-xl-none">
                                <div className="hamberger">
                                    <BurgerButton onClick={offcanvasHandler} />
                                </div>
                            </div>
                            <div
                                id="my_switcher"
                                className="setting-option my_switcher"
                            >
                                <ColorSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <MobileMenu
                isOpen={offcanvas}
                onClick={offcanvasHandler}
                menu={menuData}
                logo={headerData.logo}
            />
        </>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
