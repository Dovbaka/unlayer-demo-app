import React from 'react';
import styles from './Editor.module.css';
import sample from '../../sample.json';
import {withRouter} from "react-router";
import EmailEditor from '../script/unlayer';
//import EmailEditor from 'react-email-editor'


class EditorClass extends React.Component {

    constructor(props) {
        super(props);
        this.editor = null;
        this.isEditorLoaded = false;
        this.isComponentMounted = false;
    }

    componentDidMount() {
        this.isComponentMounted = true;
        this.loadTemplate();
    }

    onLoad = () => {
        this.isEditorLoaded = true;
        this.loadTemplate();
    }

    loadTemplate = () => {
        if (!this.isEditorLoaded || !this.isComponentMounted) return; //Check if Component is mounted and editor loaded
        this.editor.addEventListener('design:updated', () => { // Auto save to localStorage
            this.editor.saveDesign(function (data) {
                localStorage.setItem('Email-editor-saved-design', JSON.stringify(data)); // Json data
            })
        })

        const localData = localStorage.getItem('Email-editor-saved-design'); // Load design from localStorage
        return localData ? this.editor.loadDesign(JSON.parse(localData)) :
            this.editor.loadDesign(sample); // if localStorage is empty, load test design from sample.json }
    }


    exportHtml = () => {
        this.editor.exportHtml((data) => {
            localStorage.setItem('exported_Html', JSON.stringify(data.html));
            this.props.history.push("consumer");
        });
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={this.exportHtml}>Export HTML</button>
                </div>
                <EmailEditor ref={editor => this.editor = editor} onLoad={this.onLoad}
                             options={{displayMode: "web"}}
                             style={{marginTop: "50px"}}/>
            </div>
        );
    }
}

export default withRouter(EditorClass);
