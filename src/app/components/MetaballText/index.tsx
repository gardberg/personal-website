import { useEffect, useState } from 'react';
import { MetaballTextProps, TextDots } from './types';
import { analyzeText } from './fontAnalyzer';
import { MetaballCanvas } from './MetaballCanvas';

export function MetaballText({
    text,
    font,
    fontSize,
    dotDensity,
    dotSize,
    color,
    debug = false,
    alpha = 1,
    margin = 100,
    scale = 1.0
}: MetaballTextProps) {
    const [textDots, setTextDots] = useState<TextDots | null>(null);

    useEffect(() => {
        async function generateDots() {
            const dots = await analyzeText(text, font, fontSize, dotDensity);
            setTextDots(dots);
        }
        generateDots();
    }, [text, font, fontSize, dotDensity]);

    if (!textDots) {
        return <div>Loading...</div>;
    }

    if (debug) {
        return (

            <div>
                <MetaballCanvas
                dots={textDots.dots}
                width={textDots.width}
                height={textDots.height}
                dotSize={dotSize}
                color={color}
                alpha={alpha}
                debug={debug}
                text={text}
                font={font}
                fontSize={fontSize}
                margin={margin}
                scale={scale}
            />
                <p style={{
                    fontFamily: font,
                    color: color,
                    fontSize: fontSize,
                    margin: 0
                }}>{text}</p>
            </div>
        );
    }

    return (
        <MetaballCanvas
            dots={textDots.dots}
            width={textDots.width}
            height={textDots.height}
            dotSize={dotSize}
            color={color}
            debug={debug}
            alpha={alpha}
            text={text}
            font={font}
            fontSize={fontSize}
            margin={margin}
            scale={scale}
        />
    );
}