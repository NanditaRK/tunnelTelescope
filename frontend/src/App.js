import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { OBJModel } from 'react-3d-viewer';
import './ObjViewer.css';
//import example from '../src/model/tunneltelescopelogo.obj';
import example from './display_objs/tmpjgxew4og.obj'; 

function App() {
  const [eraseMode, setEraseMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [objSrc, setObjSrc] = useState(example); 
  const canvasRef = useRef(null);

  const styles = {
    border: "2px solid green",
    position: "absolute",
    top: "0px",
    width: "40%",
  };

  useEffect(() => {
    if (objSrc) {
      console.log("Updated objSrc:", objSrc);
    }
  }, [objSrc]);

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const handleResetClick = () => {
    canvasRef.current?.resetCanvas();
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleExportClick = () => {
    // export the canvas image
    canvasRef.current?.exportImage("png")
      .then(data => {
        // prepare the data to be sent to the server
        const postData = {
          input_image: data, // exported data is an image
          input_string: inputText // include the input text from the textarea
        };

        // Make a POST request to the server
        // Make a POST request to the server
      fetch('http://localhost:61111/get_obj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Failed to submit data');
          }
        })
        .then(responseData => {
          // Check if the response is a valid .obj file
          if (responseData.startsWith('o ')) {
            setObjSrc(responseData);
          } else {
            console.error('Invalid .obj file format:', responseData);
            // Handle the error, e.g., show an error message to the user
          }
        })
        .catch(error => {
          console.error('Error getting .obj data:', error);
          // Handle the error, e.g., show an error message to the user
        });
      })
      .catch(e => {
        console.error('Error exporting canvas image:', e);
      });
  };

  


  return (
    <div className="App">
      <h1 className='text-6xl m-4 font-jersey text-center'>Tunnel Telescope</h1>
      <div className="flex justify-evenly">
        <div className="flex flex-col justify-start items-center my-8">
          <div>
            <h1 className='text-center font-jersey text-2xl mb-4'>Tools</h1>
            <div className="flex gap-4 align-items-center">
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                disabled={!eraseMode}
                onClick={handlePenClick}
              >
                Pen
              </button>
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                disabled={eraseMode}
                onClick={handleEraserClick}
              >
                Eraser
              </button>
              <div className="" />
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                onClick={handleUndoClick}
              >
                Undo
              </button>
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                onClick={handleRedoClick}
              >
                Redo
              </button>
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                onClick={handleClearClick}
              >
                Clear
              </button>
              <button
                type="button"
                className="border border-2 h-8 p-4 flex justify-center items-center rounded-lg"
                onClick={handleResetClick}
              >
                Reset
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-jersey m-4">Canvas</h1>
            <ReactSketchCanvas width="800px" height="450px" strokeColor="black" ref={canvasRef} />
          </div>
          <div>
            <h1 className="text-xl font-jersey m-4">Prompt</h1>
            <textarea className='border border-2 rounded-lg w-[800px] h-24 p-4' type='text' value={inputText} onChange={handleInputChange} />
          </div>
          <input className='m-4 w-fit p-4 h-fit border border-black rounded-lg' onClick={handleExportClick} type='submit' value='Submit' />
        </div>
        <div className="model-container border border-2 h-fit rounded-lg mt-8">
          {objSrc && <OBJModel key={objSrc} style={styles} width="800" height="800" position={{ x: 0, y: 0, z: 0 }} src={objSrc} />}
        </div>
      </div>
    </div>
  );
}

export default App;
