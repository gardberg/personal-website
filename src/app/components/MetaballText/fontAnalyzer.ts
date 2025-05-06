import { MetaballDot, TextDots } from './types';

export async function analyzeText(
    text: string,
    font: string,
    fontSize: number,
    dotDensity: number
): Promise<TextDots> {
    // Create a temporary canvas to analyze the text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set font and measure text
    ctx.font = `${fontSize}px ${font}`;
    const metrics = ctx.measureText(text);
    const width = Math.ceil(metrics.width);
    const height = Math.ceil(fontSize);
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Clear and draw text
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px ${font}`; // Need to set again after canvas resize
    ctx.fillStyle = 'black';
    ctx.fillText(text, 0, fontSize * 0.8); // 0.8 is approximate baseline
    
    // Sample pixels to create dots
    const dots: MetaballDot[] = [];
    const imageData = ctx.getImageData(0, 0, width, height);
    const samplingStep = Math.max(1, Math.floor(1 / dotDensity));
    
    for (let y = 0; y < height; y += samplingStep) {
        for (let x = 0; x < width; x += samplingStep) {
            const i = (y * width + x) * 4;
            // Check alpha channel (index + 3) for non-transparent pixels
            if (imageData.data[i + 3] > 0) {
                dots.push({
                    x,
                    y,
                    size: 1
                });
            }
        }
    }

    console.log('Text analysis:', {
        text,
        font,
        fontSize,
        width,
        height,
        samplingStep,
        dotsGenerated: dots.length
    });

    return { dots, width, height };
}
