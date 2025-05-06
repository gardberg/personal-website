import { useEffect, useMemo, useState, memo } from 'react';
import { MetaballTextProps, TextDots } from './types';
import { analyzeText } from './fontAnalyzer';
import { MetaballCanvas } from './MetaballCanvas';

// Memoize the MetaballCanvas component to prevent unnecessary re-renders
const MemoizedMetaballCanvas = memo(MetaballCanvas);

// Cache for text analysis results
const textAnalysisCache = new Map<string, TextDots>();

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
    const [isLoading, setIsLoading] = useState(true);

    // Create a cache key from the text analysis parameters
    const cacheKey = useMemo(() => 
        `${text}-${font}-${fontSize}-${dotDensity}`,
        [text, font, fontSize, dotDensity]
    );

    // Memoize the canvas props to prevent unnecessary re-renders
    const canvasProps = useMemo(() => ({
        dotSize,
        color,
        debug,
        alpha,
        margin,
        scale,
        text,
        font,
        fontSize
    }), [dotSize, color, debug, alpha, margin, scale, text, font, fontSize]);

    useEffect(() => {
        let mounted = true;

        async function generateDots() {
            try {
                setIsLoading(true);

                // Check cache first
                if (textAnalysisCache.has(cacheKey)) {
                    const cachedDots = textAnalysisCache.get(cacheKey)!;
                    if (mounted) {
                        setTextDots(cachedDots);
                        setIsLoading(false);
                    }
                    return;
                }

                // Generate new dots if not in cache
                const dots = await analyzeText(text, font, fontSize, dotDensity);
                
                // Cache the result
                textAnalysisCache.set(cacheKey, dots);

                if (mounted) {
                    setTextDots(dots);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error generating dots:', error);
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }

        generateDots();

        // Cleanup function
        return () => {
            mounted = false;
        };
    }, [cacheKey, text, font, fontSize, dotDensity]);

    // Loading state
    if (isLoading || !textDots) {
        return <div>...</div>;
    }

    if (debug) {
        return (
            <div>
                <MemoizedMetaballCanvas
                    dots={textDots.dots}
                    width={textDots.width}
                    height={textDots.height}
                    {...canvasProps}
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
        <MemoizedMetaballCanvas
            dots={textDots.dots}
            width={textDots.width}
            height={textDots.height}
            {...canvasProps}
        />
    );
}

// Memoize the entire MetaballText component
export default memo(MetaballText);