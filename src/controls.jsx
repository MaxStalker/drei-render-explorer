import { useControls } from "leva";
import { useEffect } from "react";

const LS_PREFIX = "drei-controls";
const withPrefix = (key) => `${LS_PREFIX}->${key}`;

const AMBIENT_COLOR = "ambient-color";
const AMBIENT_INTENSITY = "ambient-intensity";

const getStoredValue = (key) => window.localStorage.getItem(withPrefix(key));

const controls = () => {
  const storedAmbientColor = getStoredValue(AMBIENT_COLOR);
  const storedAmbientIntensity = getStoredValue(AMBIENT_INTENSITY);

  const ambientControls = useControls(
    "Ambient Light",
    {
      color: {
        value: storedAmbientColor,
        onChange: (v) => {
          window.localStorage.setItem(withPrefix(AMBIENT_COLOR), v);
        },
        transient: false,
      },
      intensity: {
        value: storedAmbientIntensity,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (v) => {
          window.localStorage.setItem(withPrefix(AMBIENT_INTENSITY), v);
        },
        transient: false,
      },
    },
    {
      collapsed: true,
    }
  );

  const fillControls = useControls(
    "Fill Light",
    {
      color: "#ffb705",
      intensity: {
        value: 10,
        min: 0,
        max: 10,
        step: 0.01,
      },
    },
    {
      collapsed: true,
    }
  );

  const torchControls = useControls(
    "Torch Controls",
    {
      torchColor: "#a22c01",
      flameColor: `#f55605`,

      flameIntensity: {
        value: 15,
        min: 0,
        max: 20,
        step: 0.01,
      },
      flameFalloff: {
        value: 3.5,
        min: 0,
        max: 20,
        step: 0.01,
      },
    },
    {
      collapsed: true,
    }
  );

  const camera = useControls("Camera", {
    position: { x: 0, y: 3, z: 20 },
  });

  return [ambientControls, fillControls, torchControls, camera ];
};

export default controls;
