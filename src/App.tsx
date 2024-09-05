import { useState, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { Button } from "./components/Button";
import { cn } from "./utils/utils";
import { animations } from "./data/animation";

import "./themes/prism-code-slider.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Flip);

function App() {
  const [animationState, setAnimationState] = useState<"start" | "end">(
    "start"
  );
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<any>(null);

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 1,
        ease: "power1.inOut",
        onEnter: (elements) =>
          gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 1 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 1 }),
      });
    },
    {
      scope: codeContainerRef,
      dependencies: [animationState],
    }
  );

  const animate = () => {
    if (codeContainerRef.current) {
      flipState.current = Flip.getState(".token");
      setAnimationState("end");
    }
  };

  const reset = () => {
    flipState.current = Flip.getState(".token");
    setAnimationState("start");
  };

  return (
    <main className="flex p-10 flex-col min-h-screen bg-neutral-950 items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <div className="flex gap-2">
        <Button type="button" onClick={() => animate()}>
          Animate
        </Button>
        <Button type="button" onClick={() => reset()}>
          Reset
        </Button>
      </div>
      <div className="fluid-editor-container relative aspect-video w-full overflow-auto">
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <div className="absolute inset-0 h-full w-full">
            <pre className="language-js fluid-editor-padding fluid-editor-text h-full whitespace-pre-wrap break-words font-mono">
              <code className="language-js" ref={codeContainerRef}>
                {animations && (
                  <>
                    {animations.map(
                      ({ types, content, aIndex, bIndex }, index) => {
                        const typesClassName = types.join(" ");

                        const handleHidden = () => {
                          if (animationState === "start" && aIndex === -1) {
                            return true;
                          }

                          if (animationState === "end" && bIndex === -1) {
                            return true;
                          }

                          return false;
                        };

                        const customLineClassName = cn(
                          "token",
                          typesClassName,
                          {
                            hidden: handleHidden(),
                          }
                        );

                        return (
                          <span key={index} className={customLineClassName}>
                            {content}
                          </span>
                        );
                      }
                    )}
                  </>
                )}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
