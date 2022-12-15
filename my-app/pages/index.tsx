import Head from 'next/head'
import Image from 'next/image'
import axios from "axios"
import React from "react"

export default function Home() {
  const [imageAnimation, changeImageAnimation] = React.useState()
  const [input, changeInput] = React.useState()
  const [loading, changeLoading] = React.useState(false)

  function generateImage() {
    changeLoading(true)

    var data = JSON.stringify({
      "prompt": input,
      "n": 1,
      "size": "1024x1024"
    });
    
    var config = {
      method: 'post',
      url: 'https://api.openai.com/v1/images/generations',
      headers: { 
        'Authorization': 'Bearer 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', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      changeLoading(false)
      changeImageAnimation(response.data.data[0].url);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function changeInputFunction(e) {
    changeInput(e.target.value)
  }


  return (
    <div className="main">
      <h1>Generate An Image!</h1>
      <input type="text" onChange={changeInputFunction} />
      <button onClick={generateImage}>Generate!</button>
      { (imageAnimation && loading == false) &&
        <div className="images">
          <img src={imageAnimation} />
        </div>
      }
      { loading &&
        <div className="loader"></div>
      }
    </div>
  )
}
