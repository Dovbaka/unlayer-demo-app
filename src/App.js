import React, {useRef} from 'react';
import styles from './App.module.css';
import sample from './sample.json';

import EmailEditor from 'react-email-editor';

const App = () => {
    const emailEditorRef = useRef(null);


    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const {design, html} = data;
            console.log('exportHtml', html);
            console.log('exportJson', design);
        });
    };

    const onLoad = () => {

        emailEditorRef.current.editor.addEventListener('design:updated', function () { // Auto save to localStorage
            emailEditorRef.current.editor.saveDesign(function (data) {
                localStorage.setItem('Email-editor', JSON.stringify(data));
            })
        })

        const localData = localStorage.getItem('Email-editor'); // Load design from localStorage
        return localData ? emailEditorRef.current.editor.loadDesign(JSON.parse(localData)) :
            emailEditorRef.current.editor.loadDesign(sample); // if localStorage is empty, load test design from sample.json
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={exportHtml}>Export HTML</button>
            </div>
            <EmailEditor ref={emailEditorRef} onLoad={onLoad} style={{marginTop: "50px"}}/>
        </div>
    );
};

export default App;
