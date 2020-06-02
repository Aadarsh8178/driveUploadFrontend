import React,{useEffect} from 'react'

function DriveButton({datasrc,dataname}) {
    useEffect(() => {
        const script = document.createElement('script');
    
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        }
      }, []);
    return (
        <div className="g-savetodrive"
            data-src={datasrc}
            data-filename={dataname}
            data-sitename="My Company Name">
        </div> 
    )
}

export default DriveButton
