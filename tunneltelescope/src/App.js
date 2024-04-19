
import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from 'react-sketch-canvas';
import {OBJModel} from 'react-3d-viewer'
import example from '../src/model/teddy.obj';

function App() {
  
  const [eraseMode, setEraseMode] = useState(false);
  const canvasRef = useRef(null);

  
  const styles = {
    border: "2px solid green",
    width: "40%",
};


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

  return (
    <div className="App">
      <h1 className='text-4xl m-4 text-center'>Tunnel Telescope</h1>
      <OBJModel
        style={styles}
        width="800" height="1000"  
        position={{x:0,y:0,z:0}} 
        src={example}
      />
    
      
      <div className="flex flex-col justify-center items-center my-12">
        <div>
          <h1 className='text-center'>Tools</h1>
          <div className="flex gap-4 align-items-center ">
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
          <h1>Canvas</h1>
          <ReactSketchCanvas width="500px" height="500px" strokeColor="black" ref={canvasRef} />
        </div>

        <div>
          <h1>Prompt</h1>
          <textarea className='border border-black w-[500px] h-24 p-4' type='text' />
        </div>
        <input className='m-4 w-fit p-4 h-fit border rounded-lg' type='submit' />
      </div>

     

  
     
    
   

    </div>
  );
}

export default App;
