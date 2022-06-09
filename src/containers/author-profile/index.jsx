import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import Product from "@components/product/layout-01";
import { ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";

import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import MarketplaceContext from "src/web3/marketplace-context";

const AuthorProfileArea = ({ className, data }) => {


    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);
    const marketplace_ctx=useContext(MarketplaceContext);

    const onSaleProducts = shuffleArray(data.products).slice(0, 10);
    const ownedProducts = shuffleArray(data.products).slice(0, 10);
    const createdProducts = shuffleArray(data.products).slice(0, 10);
    const likedProducts = shuffleArray(data.products).slice(0, 10);

    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            판매중
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            보유중
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-contact"
                                        >
                                            Created
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Buyed
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <TabContent className="tab-content rn-bid-content">
                        <TabPane className="row d-flex g-5" eventKey="nav-home">
                            {onSaleProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {ownedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            {createdProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            {likedProducts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    <Product
                                        overlay
                                        placeBid
                                        title={prod.title}
                                        slug={prod.slug}
                                        latestBid={prod.latestBid}
                                        price={prod.price}
                                        likeCount={prod.likeCount}
                                        auction_date={prod.auction_date}
                                        image={prod.images?.[0]}
                                        authors={prod.authors}
                                        bitCount={prod.bitCount}
                                    />
                                </div>
                            ))}
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default AuthorProfileArea;
