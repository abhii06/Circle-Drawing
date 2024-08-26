import React,{useState,useRef,useEffect} from 'react';
import './Canvas.css'


const Canvas = () => {
    const [circles, setCircles] =useState([]);
    const canvasRef = useRef(null);
    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 600;
    },[]);

    const handleCanvasClick = (e) =>{
        const canvas = canvasRef.current;
        const react = canvas.getBoundingClientRect();
        const x = e.clientX - react.left;
        const y = e.clientY - react.top;

        const radius = Math.random()*(50-10)+10;
        const color =`#${Math.floor(Math.random()*16777215).toString(16)}`;

        const newCircle={x,y,radius,color,overlapping:false};

        detectOverlap(newCircle);
        setCircles([...circles,newCircle]);
    };

    const detectOverlap=(newCircle)=>{
        const updateCircles=circles.map((circle)=>{
            const dx=circle.x-newCircle.x;
            const dy=circle.y-newCircle.y;
            const distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<circle.radius+newCircle.radius){
                return { ...circle,overlapping:true,color:'red'};
            }
            return { ...circle,overlapping:false};

        });
        setCircles(updateCircles);
    }

    useEffect(()=>{
        const canvas=canvasRef.current;
        const ctx=canvas.getContext('2d');

        ctx.clearRect(0,0,canvas.width,canvas.height);

        circles.forEach((circle)=>{
            ctx.beginPath();
            ctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI);
            ctx.fillStyle=circle.color;
            ctx.fill();
        });
    },[circles]);


  return (
    <div>
      <canvas
       ref = {canvasRef}
       onClick={handleCanvasClick}
       style={{border: '1px solid black'}}
      />

    </div>
  )
}

export default Canvas