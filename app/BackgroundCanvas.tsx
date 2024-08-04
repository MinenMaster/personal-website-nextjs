import { useRef, useEffect } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null);

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        // let frameCount = 0;
        // let animationFrameId;

        // //Our draw came here
        // const render = () => {
        //     frameCount++;
        //     draw(context, frameCount);
        //     animationFrameId = window.requestAnimationFrame(render);
        // };
        // render();

        // return () => {
        //     window.cancelAnimationFrame(animationFrameId);
        // };

        const w = window.innerWidth;
        const h = window.innerHeight;
        const rate = 60;
        const arc = 75;
        const size = 4;
        const speed = 4;
        const parts: any[] = new Array(arc);
        const colors = ["#1D4ED8", "#112E80", "#071233"];
        const mouse = { x: 0, y: 0 };

        canvas.setAttribute("width", `${w}`);
        canvas.setAttribute("height", `${h}`);
        context.filter = "blur(32px)";

        let time = 0;
        let count = 0;

        const create = () => {
            time = 0;
            count = 0;

            for (let i = 0; i < arc; i++) {
                parts[i] = {
                    x: Math.ceil(Math.random() * w),
                    y: Math.ceil(Math.random() * h),
                    toX: Math.random() * 2 - 1,
                    toY: Math.random() * 2 - 1,
                    c: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * size,
                };
            }
        };

        const particles = () => {
            if (!context) return;
            context.clearRect(0, 0, w, h);
            canvas.addEventListener("mousemove", mouseMove, false);

            for (let i = 0; i < arc; i++) {
                const li = parts[i];
                const distanceFactor = Math.max(
                    Math.min(15 - distanceBetween(mouse, parts[i]) / 10, 10),
                    1
                );
                context.beginPath();
                context.arc(li.x, li.y, li.size * 20, 0, Math.PI * 2, false);
                context.fillStyle = li.c;
                context.strokeStyle = li.c;
                context.fill();

                li.x = li.x + li.toX * (time * 0.05);
                li.y = li.y + li.toY * (time * 0.05);

                if (li.x > w) {
                    li.x = 0;
                }
                if (li.y > h) {
                    li.y = 0;
                }
                if (li.x < 0) {
                    li.x = w;
                }
                if (li.y < 0) {
                    li.y = h;
                }
            }

            if (time < speed) {
                time++;
            }
            setTimeout(particles, 1000 / rate);
        };

        const mouseMove = (e: MouseEvent) => {
            mouse.x = e.layerX;
            mouse.y = e.layerY;
        };

        const distanceBetween = (
            p1: { x: number; y: number },
            p2: { x: number; y: number }
        ) => {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        };

        create();
        particles();
    }, [draw]);

    return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
