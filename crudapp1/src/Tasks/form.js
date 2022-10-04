import React from "react";
import {Input} from "antd";

const FormElement = ({handleSubmit,name,setName}) => {
    return(
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <Input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} style={{width:"50%"}} autoFocus required/>
            <br></br>
            <button className="btn btn-primary mt-1">Submit</button>
            <button className="btn btn-danger mt-1" onClick={()=>setName("")}>Cancel</button>
            <br></br>
        </div>
    </form>
    );
}

export default FormElement;