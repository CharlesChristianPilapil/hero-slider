'use client';

import { useEffect, useRef, useState } from "react";
import List from "./List";
import Thumbnail from "./Thumbnail";
import { TIMERS } from "../../../utils/constants/timers";
import { inlineString } from "../../../utils/helpers/inlineString";

const HeroSlider = () => {
    
    const Images = [
        '/images/img1.jpg',
        '/images/img2.jpg',
        '/images/img3.jpg',
        '/images/img4.jpg'
    ]

    const [slides, setSlides] = useState(Images);
    const [translateX, setTranslateX] = useState<'next' | 'prev' | ''>('');
    const [isLoading, setIsLoading] = useState(false);

    const lastInteraction = useRef(Date.now());

    const handleSlider = (action: 'next' | 'prev') => {
        setIsLoading(true);
        lastInteraction.current = Date.now();

        if (action === 'next') {
            setSlides(prev => {
                const updated = [...prev];
                const first = updated.shift();
                if (first !== undefined) {
                    updated.push(first);
                }
                return updated;
            });
            setTranslateX('next');
        } else {
            setSlides(prev => {
                const updated = [...prev];
                const last = updated.pop();
                if (last !== undefined) {
                    updated.unshift(last);
                }
                return updated;
            });
            setTranslateX('prev');
        }
        setTimeout(() => {
            setTranslateX('');
            setIsLoading(false);
        }, TIMERS.DURATION);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastInteraction = now - lastInteraction.current;
        
            if (timeSinceLastInteraction >= TIMERS.IDLE) {
                handleSlider('next');
            }
        }, 1000);
      
        return () => clearInterval(interval);
    }, []);
    
    return (
        <header className={`h-screen w-screen -mt-[50px] overflow-hidden relative group/slider ${translateX ? translateX : ''}`}>
            <List 
                action={translateX}
                slides={slides}
            />

            <Thumbnail  
                action={translateX}
                slides={slides}
            />
            
            <div className="absolute top-[80%] right-[52%] z-[100] w-[300px] max-w-[30%] flex gap-[10px] items-center">
                <button 
                    onClick={() => handleSlider('prev')}
                    disabled={isLoading}
                    className={inlineString(`
                        ${translateX ? 'pointer-events-none' : ''} 
                        w-10 h-10 rounded-full bg-[#eee4] border-none text-[#fff] border transition-all duration-[.5s] hover:bg-[#fff] hover:text-[#eee4] cursor-pointer`)
                    }
                > 
                    {'<'} 
                </button>
                <button
                    onClick={() => handleSlider('next')}
                    disabled={isLoading}
                    className={inlineString(`
                        ${translateX ? 'pointer-events-none' : ''} 
                        w-10 h-10 rounded-full bg-[#eee4] border-none text-[#fff] border transition-all duration-[.5s] hover:bg-[#fff] hover:text-[#eee4] cursor-pointer`)
                    }
                > 
                    {'>'} 
                </button>
            </div>

            <div className={`${translateX ? 'animate-timer' : ''} absolute z-1000 w-0 h-[3px] bg-[#f1683a] left-0 top-0`} />
        </header>
    )
}

export default HeroSlider