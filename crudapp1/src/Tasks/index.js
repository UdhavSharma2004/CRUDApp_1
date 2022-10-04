import React ,{useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { getNames,createName, removeName } from "./api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import FormElement from "./form";
import Loading from "./loading";

const Crud = () => {
    const [name, setName] = useState(" ");
    const [loading, setLoading] = useState(false);
    const [names, setNames] = useState([]);
    useEffect(() => {
        loadNames();
    }, []);
    const loadNames = () => getNames().then((name) => setNames(name.data));
    // console.log("working");
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createName({name}).then((res)=>{
            setLoading(false);
            setName("");
            toast.success(`${res.data.name} has been created successfully`);
            loadNames();

        }).catch((err)=>{
            setLoading(false);
            if(err.response.status===400) toast.error(err.response.data);
        });
    }
    const handleRemove=(id,name)=>{
        if(window.confirm("Do you really want to delete?")){
            setLoading(true);
            removeName(id).then((res)=>{
                setLoading(false);
                toast.error(`${name} is has been deleted successfully`);
                loadNames();
            }).catch((err)=>{
                if(err.response.status===400){
                    setLoading(false);
                    toast.error(err.response.data);
                }
            })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {loading ? (<Loading />) :
                        (
                            <>
                                <h4>React CRUD Application</h4>
                                <FormElement
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                />
                                {names && names.map((temp) => (
                                    <div className="border row mx-2 align-items-center" key={temp.id}>
                                        <ul className="list-group">
                                            <li className="list-group-item">{temp.name}
                                                <span onClick={()=>handleRemove(temp.id,temp.name)} className="btn btn-sm float-right">
                                                    <DeleteOutlined className="text-danger" />
                                                </span>
                                                <Link to={`/update/${temp.id}`}>
                                                    <span className="btn btn-sm float-right">
                                                        <EditOutlined className="text-warning" />
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Crud;