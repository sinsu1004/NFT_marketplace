import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";
import { useState,useContext } from "react";
import { toast } from "react-toastify";
import Metamask_context from "src/web3/Metamask_context";
import CollectionContext from "src/web3/collection-context";
import MarketplaceContext from "src/web3/marketplace-context";





const PersonalInformation = () => {

    const metamask =useContext(Metamask_context);
    const collection_ctx=useContext(CollectionContext);
    const marketplace_ctx=useContext(MarketplaceContext);

    console.log(collection_ctx);

    const [information,setinformation] =useState({
        username:null,
        useremail:null,
        userbio:null,
    });
    const onChangInput = e=>{
        const {name, value} =e.target;
        setinformation({...information,[name]:value});
    };
    
    const onReset = () =>{
        setinformation({
            username:null,
            useremail:null,
            userbio:null,
        });
    };
    const onSave= async() =>{
        collection_ctx.contract.methods.userupdate(information.username,information.useremail,information.userbio).send({from:metamask.account})
        .on('transactionHash',(hash)=>{
            metamask.loaduserinfo(collection_ctx.contract,metamask.account);
        })
        .on('error',(error)=>{
            toast("실패");
        });

    };
    if(information.userbio==null && information.useremail==null && information.username==null){
        if(metamask.userinfo.username !=null){
            setinformation({username:metamask.userinfo.username,useremail:metamask.userinfo.useremail,userbio:metamask.userinfo.userBio})
        };
    
    }
  

    return(
  
    <div className="nuron-information">
        <div className="profile-form-wrapper">
            <div className="input-two-wrapper mb--15">
                <div className="first-name half-wid">
                    <label htmlFor="contact-name" className="form-label">
                        Name
                    </label>
                    <input
                        name="username"
                        id="contact-name"
                        type="text"
                        defaultValue={information.username}
                        onChange={onChangInput}
                    />
                </div>
               
            </div>
            <div className="email-area">
                <label htmlFor="Email" className="form-label">
                    Edit Your Email
                </label>
                <input
                    name="useremail"
                    id="Email"
                    type="email"
                    defaultValue={information.useremail}
                    onChange={onChangInput}
                />
            </div>
        </div>
        <div className="edit-bio-area mt--30">
            <label htmlFor="Discription" className="form-label">
                Edit Your Bio
            </label>
            <textarea
                name="userbio"
                id="Discription"
                onChange={onChangInput}
                defaultValue={information.userbio}
            >
            </textarea>
        </div>
        <div className="input-two-wrapper mt--15">
            {/* <div className="half-wid currency">
                <NiceSelect
                    options={[
                        { value: "United State", text: "United State" },
                        { value: "Katar", text: "Katar" },
                        { value: "Canada", text: "Canada" },
                    ]}
                    placeholder="Location"
                    className="profile-edit-select"
                    onChange={(e) => e}
                />
            </div>
            <div className="half-wid phone-number">
                <label htmlFor="PhoneNumber" className="form-label mb--10">
                    Address
                </label>
                <input
                    name="contact-name"
                    id="PhoneNumber"
                    type="text"
                    value="USA Cidni"
                    onChange={(e) => e}
                />
            </div> */}
        </div>
        <div className="button-area save-btn-edit">
            <Button className="mr--15" color="primary-alta" size="medium" onClick={onReset}>
                Cancel
            </Button>
            <Button size="medium" onClick={onSave} >Save</Button>
        </div>
    </div>
    )
    
};

export default PersonalInformation;
