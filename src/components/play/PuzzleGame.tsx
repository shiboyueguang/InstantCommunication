import React, { useRef, useEffect, useState } from 'react';
interface PuzzleGameProps {
    rows: number;
    cols: number;
    imageSrc: string;
}
const PuzzleGame: React.FC<PuzzleGameProps> = ({ rows, cols, imageSrc }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [pieces, setPieces] = useState<{ x: number; y: number; correct: boolean }[][]>([]);
    const [dragging, setDragging] = useState<{ piece: { x: number; y: number; correct: boolean }; offsetX: number; offsetY: number } | null>(null);
    if(rows === 0 || cols === 0) {
        return ;
    }
    useEffect(() => {
        const img = imageRef.current;
        const canvas = canvasRef.current;
        if (img && canvas && img.complete) {
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const pieceWidth = img.width / cols;
                    const pieceHeight = img.height / rows;
                    const newPieces: { x: number; y: number; correct: boolean }[][] = [];
                    for (let row = 0; row < rows; row++) {
                        const rowPieces: { x: number; y: number; correct: boolean }[] = [];
                        for (let col = 0; col < cols; col++) {
                            rowPieces.push({ x: col * pieceWidth, y: row * pieceHeight, correct: false });
                        }
                        newPieces.push(rowPieces);
                    }
                    // 打乱拼图块
                    const shuffledPieces = shuffleArray(newPieces.flat()).reduce((acc, piece, index) => {
                        const row = Math.floor(index / cols);
                        const col = index % cols;
                        acc[row] = acc[row] || [];
                        acc[row][col] = piece;
                        return acc;
                    }, [] as { x: number; y: number; correct: boolean }[][]);
                    setPieces(shuffledPieces);
                }
            };
        }
    }, [rows, cols]);
    const shuffleArray = (array: any[]) => {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>, row: number, col: number) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            setDragging({
                piece: pieces[row][col],
                offsetX: e.clientX - rect.left - pieces[row][col].x,
                offsetY: e.clientY - rect.top - pieces[row][col].y,
            });
        }
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (dragging && dragging.piece) {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const newPieces = pieces.slice();
                // newPieces[dragging.piece.y / (canvas.height / rows)][dragging.piece.x / (canvas.width / cols)].x = e.clientX - rect.left - dragging.offsetX;
                // newPieces[dragging.piece.y / (canvas.height / rows)][dragging.piece.x / (canvas.width / cols)].y = e.clientY - rect.top - dragging.offsetY;
                // setPieces(newPieces);
                const row = Math.floor(dragging.piece.y / (canvas.height / rows));
                const col = Math.floor(dragging.piece.x / (canvas.width / cols));
                if (newPieces[row] && newPieces[row][col]) { // 添加检查
                    newPieces[row][col].x = e.clientX - rect.left - dragging.offsetX;
                    newPieces[row][col].y = e.clientY - rect.top - dragging.offsetY;
                    setPieces(newPieces);
                }
            }
        }
    };
    const handleMouseUp = () => {
        if (dragging) {
            setDragging(null);
        }
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const piece = pieces[row][col];
                        ctx.drawImage(imageRef.current!, piece.x, piece.y, canvas.width / cols, canvas.height / rows, col * (canvas.width / cols), row * (canvas.height / rows), canvas.width / cols, canvas.height / rows);
                    }
                }
            }
        }
    }, [pieces, rows, cols]);
    return (
        <div>
            <img src={imageSrc} ref={imageRef} style={{ display: 'none' }} alt="Puzzle Image" />
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                onMouseDown={(e) => {
                    const rect = canvasRef.current!.getBoundingClientRect();
                    const col = Math.floor((e.clientX - rect.left) / (canvasRef.current!.width / cols));
                    const row = Math.floor((e.clientY - rect.top) / (canvasRef.current!.height / rows));
                    handleMouseDown(e, row, col);
                }}
                onMouseMove={e => handleMouseMove(e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />
        </div>
    );
};

export default PuzzleGame;