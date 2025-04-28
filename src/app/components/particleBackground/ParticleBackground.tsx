"use client";
import React, { useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  return (
    init && (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          autoPlay: true,
          background: {
            color: {
              value: "#0d47a1",
            },
            opacity: 1
          },
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push"
              },
              onHover: {
                enable: true,
                mode: "grab",
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10
                }
              },
              resize: {
                enable: true
              }
            },
            modes: {
              grab: {
                distance: 400,
                links: {
                  opacity: 1
                }
              },
              push: {
                quantity: 4
              }
            }
          },
          particles: {
            color: {
              value: "#ffffff"
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: {
                default: "out"
              }
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 100
            },
            opacity: {
              value: {
                min: 0.1,
                max: 0.5
              },
              animation: {
                enable: true,
                speed: 3
              }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: {
                min: 1,
                max: 10
              },
              animation: {
                enable: true,
                speed: 20
              }
            }
          },
          detectRetina: true
        }}
      />
    )
  );
};

export default ParticleBackground;