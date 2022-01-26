import React, {useRef} from "react";

const Torch = (props)=> {
    const ref = useRef();
    const { flameColor, flameFalloff, torchColor, flameIntensity = 10 } = props;
    const torchIntensity = 8;
    const torchMax = 6;
    const torchDecay = 2;

    const flameMax = 2;

    return (
        <group {...props} ref={ref}>
            <pointLight
                castShadows
                args={[torchColor, torchIntensity, torchMax, torchDecay]}
            />
            <pointLight
                castShadows
                position={[0, -0.7, 0]}
                args={[flameColor, flameIntensity, flameFalloff, 1.75]}
            />
        </group>
    );
}

export default Torch