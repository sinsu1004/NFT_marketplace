import { useState, useEffect,useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-02";
import Product from "@components/product/layout-01";
import Button from "@ui/button";
import { SectionTitleType, ProductType } from "@utils/types";

import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import MarketplaceContext from "src/web3/marketplace-context";

const ExploreProductArea = ({ className, space, data }) => {
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);
    const marketplace_ctx=useContext(MarketplaceContext);

    useEffect(() => {
        const currentProducts = data.products.slice(0, 10);
        console.log(data);
        console.log(collection_ctx);
        console.log(marketplace_ctx);
        setProducts(currentProducts);
        setHasMore(currentProducts.length < data.products.length);
    }, [data.products]);

    const loadMoreHandler = () => {
        const currentProducts = data.products.slice(0, products.length + 4);
        setProducts(currentProducts);
        setHasMore(currentProducts.length < data.products.length);
    };
    console.log(data)
    return (
        <div
            className={clsx(
                "rn-product-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                {data?.section_title && (
                    <div className="row mb--50 align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <SectionTitle
                                className="mb--0"
                                {...data.section_title}
                            />
                        </div>
                    </div>
                )}

                {products.length > 0 && (
                    <div className="row g-5">
                        {products.map((prod) => (
                            <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                                <Product
                                    title={prod.title}
                                    slug={prod.slug}
                                    price={prod.price}
                                    image={prod.images?.[0]}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="view-more-btn mt--50">
                            <Button
                                color="primary-alta"
                                className={!hasMore ? "disabled" : ""}
                                fullwidth
                                onClick={loadMoreHandler}
                            >
                                {hasMore ? (
                                    <>View More Items</>
                                ) : (
                                    <>No More Items</>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ExploreProductArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreProductArea.defaultProps = {
    space: 1,
};

export default ExploreProductArea;
