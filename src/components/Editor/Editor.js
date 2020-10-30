import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router";
import styles from './Editor.module.css';
import sample from '../../sample.json';
import WebEditor from '../script/unlayer';
//import WebEditor from 'react-email-editor'

const Editor = () => {
    const emailEditorRef = useRef(null);
    let history = useHistory();

    const [isEditorLoaded, setEditorLoadStatus] = useState(false);
    const [isComponentMounted, setComponentMountStatus] = useState(false);

    useEffect(() => {
        setComponentMountStatus(true);
        loadTemplate()
    })

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            localStorage.setItem('exported_Html', JSON.stringify(data.html));Ф
            let path = `consumer`;
            history.push(path);
        });
    };

    const onLoad = () => {
        setEditorLoadStatus(true);
        loadTemplate();
    }

    const loadTemplate = () => {
        if (!isEditorLoaded || !isComponentMounted) return; //Check if Component is mounted & editor loaded
        emailEditorRef.current.editor.addEventListener('design:updated', () => { // Auto save to localStorage
            emailEditorRef.current.editor.saveDesign(function (data) {
                localStorage.setItem('Email-editor-saved-design', JSON.stringify(data)); // Json data
            })
        })

        const localData = localStorage.getItem('Email-editor-saved-design'); // Load design from localStorage
        return localData ? emailEditorRef.current.editor.loadDesign(JSON.parse(localData)) : [];
    };

    const LoadSample = () => {
        emailEditorRef.current.editor.loadDesign(sample); // if localStorage is empty, load test design from sample.json
        emailEditorRef.current.editor.saveDesign(function (sample) {
            localStorage.setItem('Email-editor-saved-design', JSON.stringify(sample)); // Json data
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={LoadSample}>Load Sample</button>
                <button onClick={exportHtml}>Export HTML</button>
            </div>
            <WebEditor ref={emailEditorRef} onLoad={onLoad} options={{displayMode:'web'}} style={{marginTop: "50px"}}/>
        </div>
    );
};

export default Editor;
