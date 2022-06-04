import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import CountdownTimer from "@ui/countdown/layout-01";
import ClientAvatar from "@ui/client-avatar";
import ShareDropdown from "@components/share-dropdown";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";

const Product = ({
    title,
    slug,
    price,
    image,
 
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div
                className="product-style-one"
            >
                <div className="card-thumbnail">
                    {image?.src && (
                        <Anchor path={`/product/${slug}`}>
                            <Image
                                // src={image.src}
                                src="https://ipfs.infura.io/ipfs/QmWnaePrKkS3FpHhdazZEg7fLzR7NkjDMHkaTYv7XXCHS5"
                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                                unoptimized={true}
                            />
                        </Anchor>
                    )}
                 
                    {/* {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>   
                    )} */}
                </div>
                <div className="product-share-wrapper">
                   
                </div>
                <Anchor path={`/product/${slug}`}>
                    <span className="product-name">{title}</span>
                </Anchor>
                
                <ProductBid price={price} />
            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

Product.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    image: ImageType.isRequired,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
