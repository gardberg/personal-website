export interface MetaballTextProps {
    text: string;
    font: string;
    fontSize: number;
    dotDensity: number;
    dotSize: number;
    color: string;
    debug?: boolean;
    alpha?: number;
    margin?: number;
    scale?: number;
}

export interface MetaballDot {
    x: number;
    y: number;
    size: number;
}

export interface TextDots {
    dots: MetaballDot[];
    width: number;
    height: number;
}
