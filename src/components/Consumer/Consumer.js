import React, {useState} from "react";

const Consumer = () => {
    const [html] = useState(
        ()=>{
            const localData = localStorage.getItem('exported_Html');
            return localData ? JSON.parse(localData) : [];
        }
    );

    return (
        <div dangerouslySetInnerHTML={{__html: html}}>

        </div>
    );
}

export default Consumer