import { useState,useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Image from "next/image";
import { ImageType } from "@utils/types";
import ShareDropdown from "@components/share-dropdown";
import ShareModal from "@components/modals/share-modal";
import Anchor from "@ui/anchor";
import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";

const AuthorIntroArea = ({ className, space, data }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const shareModalHandler = () => setIsShareModalOpen((prev) => !prev);
    const metamask =useContext(Metamask_context);
    const collection_ctx =useContext(CollectionContext);
    console.log(metamask);
    return (
        <>
            <ShareModal
                show={isShareModalOpen}
                handleModal={shareModalHandler}
            />
            <div className="rn-author-bg-area position-relative ptb--150">
                {
                     typeof metamask.userinfo.userCover  =="undefined"
                     ?
                        <Image
                            src="/images/bg/bg-image-9.jpg"
                            alt="Slider BG"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority
                        />
                     :
                     metamask.userinfo.userCover  != ""
                     ?
                     <Image
                     src={`https://ipfs.infura.io/ipfs/${metamask.userinfo.userCover }`}
                     alt={
                         data.image?.alt || data.name
                     }
                     quality={100}
                     priority
                     layout="fill"
                     unoptimized={true}
                     />
                     :
                     <Image
                            src="/images/bg/bg-image-9.jpg"
                            alt="Slider BG"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority
                        />

                }
            </div>
            <div
                className={clsx(
                    "rn-author-area",
                    space === 1 && "mb--30 mt_dec--120",
                    className
                )}
            >
                <div className="container">
                    <div className="row padding-tb-50 align-items-center d-flex">
                        <div className="col-lg-12">
                            <div className="author-wrapper">
                                <div className="author-inner">
                                    {
                                    typeof metamask.userinfo.userProfile  =="undefined"
                                    ?
                                    (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={data.image.src}
                                                alt={
                                                    data.image?.alt || data.name
                                                }
                                                width={140}
                                                height={140}
                                                layout="fixed"
                                            />
                                        </div>
                                    )
                                    :
                                    metamask.userinfo.userProfile  != ""
                                    ?
                                    <Image
                                    src={`https://ipfs.infura.io/ipfs/${metamask.userinfo.userProfile }`}
                                    alt={
                                        data.image?.alt || data.name
                                    }
                                    width={140}
                                    height={140}
                                    layout="fixed"
                                    unoptimized={true}
                                    />
                                    :
                                    
                                    (
                                        <div className="user-thumbnail">
                                            <Image
                                                src={data.image.src}
                                                alt={
                                                    data.image?.alt || data.name
                                                }
                                                width={140}
                                                height={140}
                                                layout="fixed"
                                            />
                                        </div>
                                    )
                                    
                                    
                                    
                                    
                                    
                                  
                                    
                                    
                                    
                                    
                                    }

                                    <div className="rn-author-info-content">
                                        <h4 className="title"> {metamask.userinfo.username !="" ? metamask.userinfo.username : metamask.account }님</h4>
                                        <div className="author-button-area">
                                            <button
                                                type="button"
                                                className="btn at-follw share-button"
                                                onClick={shareModalHandler}
                                            >
                                                <i className="feather-share-2" />
                                            </button>

                                            <div className="count at-follw">
                                                <ShareDropdown />
                                            </div>
                                            <Anchor
                                                path="/edit-profile"
                                                className="btn at-follw follow-button edit-btn"
                                            >
                                                <i className="feather feather-edit" />
                                            </Anchor>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AuthorIntroArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
    data: PropTypes.shape({
        name: PropTypes.string,
        twitter: PropTypes.string,
        followers: PropTypes.string,
        following: PropTypes.string,
        image: ImageType,
    }),
};
AuthorIntroArea.defaultProps = {
    space: 1,
};

export default AuthorIntroArea;
