import React, { useRef, useState} from 'react';
import axios from 'axios';

import classes from './driveUpload.module.css';
import DriveButton from './driveButton';

function DriveUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name:"", path: "" });    
    const [name,setName] = useState("")
    const [error,setError] = useState(false)
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        if(!file.name.endsWith('.pdf')){
            setError(true)
            return;
        }
        setProgess(0)
        setFile(file); // storing file
        setName(file.name)
        setError(false)
    }
    
    const uploadFile = () => {
        const formData = new FormData();       
        formData.append('file', file); // appending file
        axios.post('http://localhost:8000/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                     path: 'http://localhost:8000/upload' + res.data.path
                   })
        }).catch(err => console.log(err)
    )}
    return (
        
        <div className={classes.fileUpload}>
            {error?<p>Only Pdfs are allowed</p>:null}
            <input type="file" ref={el} onChange={handleChange} className={classes.fileInput} title=" "/>   
            {progress!==0?<div className={classes.progressBar} style={{ width: progress }}>
                {progress}
            </div>:null}
            <input 
            className={classes.inputName}
            value={name}
            placeholder="name of file"
            onChange={(e)=>setName(e.target.value)}
            ></input>
            <button onClick={uploadFile} className={classes.upButton}>                 
                Upload
            </button>
            {data.path!==""?
            <div className={classes.driveButton}><DriveButton datasrc={data.path} dataname={name}/></div>
            :<div className={classes.NoButton}>Save to drive button will be shown once upload finishes </div>}
        </div>
       
    );
}
export default DriveUpload;
    
