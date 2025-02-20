import p5 from 'p5';
import { MetaballDot } from './types';

// Constants for metaball behavior
const METABALL_THRESHOLD = 30.0;

export function createMetaballSketch(
    dots: MetaballDot[],
    width: number,
    height: number,
    dotSize: number,
    color: string, // hex format, e.g. #ff0000
    margin = 100,
    debug = false,
    alpha = 1.0,
    scale = 2
) {
    return (p: p5) => {
        let pg: p5.Graphics;

        // Adjust dot positions by margin and scale
        const adjustedDots = dots.map(dot => ({
            ...dot,
            x: (dot.x + margin/2) * scale,
            y: (dot.y + margin/2) * scale
        }));

        p.setup = () => {
            // Create canvas at original size
            p.createCanvas(width + margin, height + margin);
            // Create high-res graphics buffer
            pg = p.createGraphics((width + margin) * scale, (height + margin) * scale);
            pg.pixelDensity(1);
            p.pixelDensity(1);
            p.colorMode(p.RGB);
            p.noStroke();
        };

        p.draw = () => {
            pg.clear();
            pg.background(255);
            
            pg.loadPixels();
            const pixels = pg.pixels;
            const w = pg.width;
            const h = pg.height;
            
            // Pre-calculate squared values
            const dotSizeSquared = (dotSize * scale) * (dotSize * scale);
            const maxRadius = dotSize * scale * 4; // Only check pixels within this radius (a bit buggy, but cool?)
            const maxRadiusSquared = maxRadius * maxRadius;
            
            // Create lookup table for dots
            const dotsByRegion = new Map();
            const regionSize = maxRadius;
            adjustedDots.forEach(dot => {
                const regionX = Math.floor(dot.x / regionSize);
                const regionY = Math.floor(dot.y / regionSize);
                const key = `${regionX},${regionY}`;
                if (!dotsByRegion.has(key)) dotsByRegion.set(key, []);
                dotsByRegion.get(key).push(dot);
            });

            // Process pixels in chunks for better performance
            const chunkSize = 100;
            for (let cy = 0; cy < h; cy += chunkSize) {
                for (let cx = 0; cx < w; cx += chunkSize) {
                    const endY = Math.min(cy + chunkSize, h);
                    const endX = Math.min(cx + chunkSize, w);
                    
                    // Get relevant dots for this chunk
                    const relevantDots = new Set();
                    for (let ry = Math.floor(cy/regionSize); ry <= Math.floor(endY/regionSize); ry++) {
                        for (let rx = Math.floor(cx/regionSize); rx <= Math.floor(endX/regionSize); rx++) {
                            const dots = dotsByRegion.get(`${rx},${ry}`);
                            if (dots) dots.forEach((d: MetaballDot) => relevantDots.add(d));
                        }
                    }

                    // Process pixels in chunk
                    for (let y = cy; y < endY; y++) {
                        for (let x = cx; x < endX; x++) {
                            let sum = 0;
                            for (const dot of relevantDots) {
                                const typedDot = dot as { x: number; y: number };
                                const dx = x - typedDot.x;
                                const dy = y - typedDot.y;
                                const distSquared = dx * dx + dy * dy;
                                if (distSquared < maxRadiusSquared) {
                                    sum += dotSizeSquared / distSquared;
                                }
                            }
                            
                            const index = 4 * (y * w + x);
                            const isInside = sum > METABALL_THRESHOLD;
                            pixels[index] = isInside ? parseInt(color.slice(1, 3), 16) : 255;
                            pixels[index + 1] = isInside ? parseInt(color.slice(3, 5), 16) : 255;
                            pixels[index + 2] = isInside ? parseInt(color.slice(5, 7), 16) : 255;
                            pixels[index + 3] = 255 * alpha;
                        }
                    }
                }
            }
            pg.updatePixels();
            
            p.clear();
            p.image(pg, 0, 0, p.width, p.height);

            if (debug) {
                drawDots(p, adjustedDots, 4, '#ff0000');
            }
        };
    };
}

export function drawDots(
    p: p5,
    dots: MetaballDot[],
    dotSize: number,
    color: string
) {
    p.fill(color);
    p.noStroke();
    for (const dot of dots) {
        p.circle(dot.x, dot.y, dotSize);
    }
}