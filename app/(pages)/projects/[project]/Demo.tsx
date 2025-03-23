'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

interface Point {
  x: number;
  y: number;
}

const IndexPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setContext(ctx);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        saveCanvasState();
      }
    }
  }, []);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!context) return;
      setIsDrawing(true);
      const { x, y } = getCoordinates(event);
      context.beginPath();
      context.moveTo(x, y);
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    },
    [context, color, lineWidth],
  );

  const draw = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!context || !isDrawing) return;
      const { x, y } = getCoordinates(event);
      context.lineTo(x, y);
      context.stroke();
    },
    [context, isDrawing],
  );

  const stopDrawing = useCallback(() => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
    saveCanvasState();
  }, [context]);

  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ((event as React.TouchEvent<HTMLCanvasElement>).touches) {
      x = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX - rect.left;
      y = (event as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY - rect.top;
    } else {
      x = (event as React.MouseEvent<HTMLCanvasElement>).clientX - rect.left;
      y = (event as React.MouseEvent<HTMLCanvasElement>).clientY - rect.top;
    }
    return { x, y };
  };

  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const currentState = canvasRef.current.toDataURL();
    setHistory((prevHistory) => [...prevHistory, currentState]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    setRedoStack((prevRedo) => [...prevRedo, history[history.length - 1]]);
    setHistory((prevHistory) => prevHistory.slice(0, -1));

    const previousState = history[history.length - 2];
    restoreCanvasState(previousState);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setHistory((prevHistory) => [...prevHistory, redoStack[redoStack.length - 1]]);
    setRedoStack((prevRedo) => prevRedo.slice(0, -1));

    const nextState = redoStack[redoStack.length - 1];
    restoreCanvasState(nextState);
  };

  const restoreCanvasState = (dataURL: string) => {
    if (!context || !canvasRef.current) return;

    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      context.drawImage(img, 0, 0);
    };
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveCanvasState();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-serif">
      <Head>
        <title>Vintage Paint App</title>
      </Head>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Vintage Paint</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-gray-300">
        <div className="flex items-center mb-4 space-x-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 rounded-full cursor-pointer"
          />

          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value, 10))}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />

          <button
            onClick={undo}
            disabled={history.length <= 1}
            className={`px-4 py-2 rounded text-white ${history.length <= 1 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}`}
          >
            Undo
          </button>

          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className={`px-4 py-2 rounded text-white ${redoStack.length === 0 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}`}
          >
            Redo
          </button>

          <button onClick={clearCanvas} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
            Clear
          </button>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="bg-yellow-50 rounded-md border border-gray-400"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <footer className="mt-8 text-gray-600">Made with Next.js and Tailwind CSS</footer>
    </div>
  );
};

export default IndexPage;
