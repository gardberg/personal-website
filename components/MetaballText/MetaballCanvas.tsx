"use client";

import { useEffect, useRef } from 'react';
import { MetaballDot } from './types';
import { createMetaballSketch } from './metaballRenderer';
import type p5 from 'p5';

interface MetaballCanvasProps {
    dots: MetaballDot[];
    width: number;
    height: number;
    dotSize: number;
    color: string;
    debug?: boolean;
    text?: string;
    font?: string;
    fontSize?: number;
    alpha?: number;
    margin?: number;
    scale?: number;
}

export function MetaballCanvas({
    dots,
    width,
    height,
    dotSize,
    color,
    debug = false,
    text,
    font,
    fontSize,
    alpha = 1,
    margin = 100,
    scale = 1.0
}: MetaballCanvasProps) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const p5Instance = useRef<p5 | null>(null);

    useEffect(() => {
        let mounted = true;

        // Create new p5 instance
        import('p5').then((p5Module: { default: typeof p5 }) => {
            // Check if component is still mounted and no existing instance
            if (mounted && canvasRef.current) {
                // Clean up existing instance if it exists
                if (p5Instance.current) {
                    p5Instance.current.remove();
                }
                
                const p5 = p5Module.default;
                p5Instance.current = new p5(
                    createMetaballSketch(dots, width, height, dotSize, color, margin, debug, alpha, scale),
                    canvasRef.current
                );
            }
        });

        // Cleanup on unmount or when dependencies change
        return () => {
            mounted = false;
            if (p5Instance.current) {
                p5Instance.current.remove();
                p5Instance.current = null;
            }
        };
    }, [dots, width, height, dotSize, color, debug, text, font, fontSize, alpha, margin, scale]);

    return (
        <div 
            ref={canvasRef}
            style={{
                ...(debug && { border: '1px solid #ccc' }),
                minHeight: height,
                minWidth: width
            }}
        />
    );
}
