import React,{useState,useEffect} from "react";
import {toast} from "react-toastify";
import{updateName,getName} from "./api";
import FormElement from "./form";
import Loading from "./loading";
import { useNavigate, useParams } from "react-router-dom";

const Update=()=>{
    const {id}=useParams();
    const[name,setName]=useState("");
    const[loading,setLoading]=useState(false);
        useEffect(()=>{
            loadName();
        },[]);
    const loadName=()=>{
        getName(id).then((d)=>setName(d.data.name));
    };
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        updateName(id,{name}).then((res)=>{
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} has  been updated`);
            navigate(-1);
        }).catch((err)=>{
            setLoading(false);
            if(err.response.status === 400)
                toast.error(err.response.data);
        })
    };

        return(
            <div className="container-fluid">
                <div className="col-md-8">
                    {loading ? <Loading/>:<h4>Update Element</h4>}
                    <FormElement handleSubmit={handleSubmit} name={name} setName={setName}/>
                </div>
            </div>
        );

};

export default Update;