import React, {useRef} from 'react';
import styles from './Editor.module.css';
import sample from '../../sample.json';
import {useHistory} from "react-router";
import EmailEditor from '../script/unlayer';

const Editor = () => {
    const emailEditorRef = useRef(null);
    let history = useHistory();

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            localStorage.setItem('exported_Html', JSON.stringify(data.html));
            let path = `consumer`;
            history.push(path);
        });
    };

    const onLoad = () => {

        emailEditorRef.current.editor.addEventListener('design:updated', function () { // Auto save to localStorage
            emailEditorRef.current.editor.saveDesign(function (data) {
                localStorage.setItem('Email-editor-saved-design', JSON.stringify(data)); // Json data
            })
        })

        const localData = localStorage.getItem('Email-editor-saved-design'); // Load design from localStorage
        return localData ? emailEditorRef.current.editor.loadDesign(JSON.parse(localData)) :
            emailEditorRef.current.editor.loadDesign(sample); // if localStorage is empty, load test design from sample.json
    };


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={onLoad}>Load draft</button>
                <button onClick={exportHtml}>Export HTML</button>
            </div>
            <EmailEditor ref={emailEditorRef} style={{marginTop: "50px"}}/>

        </div>
    );
};

export default Editor;
