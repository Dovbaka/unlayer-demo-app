import React, {useState} from "react";

const Consumer = () => {

    const [html] = useState( //Load exported HTML
        ()=>{
            const localData = localStorage.getItem('exported_Html');
            return localData ? JSON.parse(localData) : [];
        }
    );

    return (
        <div dangerouslySetInnerHTML={{__html: html}}/>
    );
}

export default Consumer;

