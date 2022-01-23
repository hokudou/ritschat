import React, { useState } from "react";
        import SyntaxHighlighter from "react-syntax-highlighter";
        import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";
        
        const Code = () => {
            const [codeList] = useState([]);
        const [selectedLanguageKey, setLanguageKey] = useState("");
        const languageKey = (selectedLanguage) => {
            setLanguageKey(selectedLanguage.target.value);
        };
    
        return (
            <>
                <select className="code-select" onChange={languageKey}>
                    <option>Please Select Code..</option>
                    {codeList.map((language) => {
                        return (
                            <option value={language.code}>{language.name}</option>
                        );
                    })}
                </select>
    
                <SyntaxHighlighter language="htmlbars" style={monokaiSublime}>
                    {selectedLanguageKey}
                </SyntaxHighlighter>
            </>
        );
    };
    
    export default Code;