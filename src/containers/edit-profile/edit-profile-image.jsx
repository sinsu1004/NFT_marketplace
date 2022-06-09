/* eslint-disable @next/next/no-img-element */
import { useState,useContext } from "react";
import Image from "next/image";
import Button from "@ui/button";
import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import { toast } from "react-toastify";

import * as ipfsClient from "ipfs-http-client";
const ipfs = ipfsClient.create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
const EditProfileImage = () => {
    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);

    const [selectedImage, setSelectedImage] = useState({
        profile: "",
        cover: "",
    });
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0],
            }));

        }
    };
    const onReset = () =>{
   
    };

    const onSave= async() =>{
        const profileupload= await ipfs.add(selectedImage.profile);
        if(!profileupload){
            console.error('파일 업로드에 실패하였습니다.');
            return;
        }
        const coverupload= await ipfs.add(selectedImage.cover);
        if(!coverupload){
            console.error('파일 업로드에 실패하였습니다.');
            return;
        }
        collection_ctx.contract.methods.userupdatePhoto(profileupload.path,coverupload.path).send({from:metamask.account})
        .on('transactionHash',(hash)=>{
            metamask.loaduserinfo(collection_ctx.contract,metamask.account);
        })
        .on('error',(error)=>{
            toast("실패");
        });


    };
  

    return (
        <div className="nuron-information">
            <div className="profile-change row g-5">
                <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap">
                            {selectedImage?.profile ? (
                                <img
                                    src={URL.createObjectURL(
                                        selectedImage.profile
                                    )}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) :
                            typeof metamask.userinfo.userProfile =="undefined"
                                ?
                                (
                                    <Image
                                        id="rbtinput1"
                                        src="/images/profile/profile-01.jpg"
                                        alt="Profile-NFT"
                                        layout="fill"
                                    />
                                )
                                :
                                metamask.userinfo.userProfile != ""
                                ?
                                <Image
                                id="rbtinput1"
                                src={`https://ipfs.infura.io/ipfs/${metamask.userinfo.userProfile}`}
                                alt="Profile-NFT"
                                layout="fill"
                                unoptimized={true}
                                />
                                :
                            (
                                <Image
                                    id="rbtinput1"
                                    src="/images/profile/profile-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )
                            
                            }
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profile"
                                id="fatima"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="fatima" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="profile-left right col-lg-8">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap">
                            {selectedImage?.cover ? (
                                <img
                                    src={URL.createObjectURL(
                                        selectedImage.cover
                                    )}
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : 
                            typeof metamask.userinfo.userCover =="undefined"
                            ?
                            (
                                <Image
                                    id="rbtinput1"
                                    src="/images/profile/profile-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )
                            :
                            metamask.userinfo.userCover != ""
                            ?
                            <Image
                            id="rbtinput1"
                            src={`https://ipfs.infura.io/ipfs/${metamask.userinfo.userCover}`}
                            alt="Profile-NFT"
                            layout="fill"
                            unoptimized={true}
                            />
                            :
                            
                            (
                                <Image
                                    id="rbtinput2"
                                    src="/images/profile/cover-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )
                            }
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="cover"
                                id="nipa"
                                type="file"
                                onChange={imageChange}
                            />
                            <label htmlFor="nipa" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-area save-btn-edit">
            <Button className="mr--15" color="primary-alta" size="medium" onClick={onReset}>
                Cancel
            </Button>
            <Button size="medium" onClick={onSave} >Save</Button>
        </div>
        </div>
    );
};

export default EditProfileImage;
