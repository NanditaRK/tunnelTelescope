import './App.css';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRef, useState } from "react";

function App() {
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };
  
  const canvasRef = useRef(null); // Remove <ReactSketchCanvasRef>
  const [eraseMode, setEraseMode] = useState(false);

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
      <div className="flex flex-col justify-center items-center my-12">
        <div>
        <h1 className='text-center'>Tools</h1>
        <div className="flex align-items-center ">
          <button
            type="button"
            className="border border-2 h-8 "
            disabled={!eraseMode}
            onClick={handlePenClick}
          >
            Pen
          </button>
          <button
            type="button"
            className="border border-2 h-8 "
            disabled={eraseMode}
            onClick={handleEraserClick}
          >
            Eraser
          </button>
          <div className="" />
          <button
            type="button"
            className="border border-2 h-8 "
            onClick={handleUndoClick}
          >
            Undo
          </button>
          <button
            type="button"
            className="border border-2 h-8 "
            onClick={handleRedoClick}
          >
            Redo
          </button>
          <button
            type="button"
            className="border border-2 h-8 "
            onClick={handleClearClick}
          >
            Clear
          </button>
          <button
            type="button"
            className="border border-2 h-8"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>

        </div>
        
        <div>
        <h1>Canvas</h1>
        <ReactSketchCanvas width="500px" height="500px" ref={canvasRef} />

        </div>
       
      </div>
    </div>
  );
}

export default App;
