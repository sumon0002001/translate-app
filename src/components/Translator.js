import React, {useState, useEffect} from 'react'
import '../App.css';
import {
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';
import axios from 'axios';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguageKey, setSelectedLanguageKey] = useState("")
  const [detectLanguageKey, setDetectLanguageKey] = useState('')

  const getLanguageSource = () => {
    axios.post ('https://libretranslate.de/detect', {
        q: inputText
    })
    .then((response) => {
        setDetectLanguageKey(response.data[0].language);
    })
  }

  const translateText =() => {
    setResultText(inputText);

    getLanguageSource();
    let data = {
      q : inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey
    }
    axios.post('https://libretranslate.de/translate', data )
    .then((response) => {
        setResultText(response.data.translatedText);
    })

  }

  const languageKey = (selectedlanguage) => {
     setSelectedLanguageKey(selectedlanguage.target.value);
  }

  
 useEffect(() => {
    axios.get('https://libretranslate.de/languages')
    .then(function (response) {
      // handle success
      setLanguagesList(response.data)
    })
    getLanguageSource();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [inputText])


  return (
    <div  className="app-header">
      <h1>Nusrat Translator</h1>
      <Form >
      <Form.Field
        control={TextArea}
        placeholder='Type Text to Translate..'
        onChange={(e) => {
            setInputText(e.target.value)
        }}
     />
       <select className="language-select" onChange={languageKey}>
       <option>Please Select Language..</option>
       {languagesList.map((language) => {
           return <option value={language.code}>{language.name}</option>
       })}
       </select>
       <Form.Field
        control={TextArea}
        placeholder='Your Result Translation..'
        value={resultText}
        />
        <Button 
          color="orange" 
          size="large" 
          onClick={translateText}
        >
        <Icon name='translate' />
        Translate</Button>

        

      </Form>
            
    </div>
    )
}

export default Translator;
