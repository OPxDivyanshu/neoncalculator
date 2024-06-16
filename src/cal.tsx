import React, { useState } from "react";

const Cal: React.FC = () => {
    const [display, setDisplay] = useState<string>("0");
    const [currentValue, setCurrentValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

    const handleNumberClick = (num: number) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? String(num) : display + num);
        }
    };

    const handleOperatorClick = (op: string) => {
        if (currentValue === null) {
            setCurrentValue(parseFloat(display));
        } else if (operator) {
            const result = calculate();
            setCurrentValue(result);
            setDisplay(String(result));
        }
        setOperator(op);
        setWaitingForOperand(true);
    };

    const handleEqualsClick = () => {
        if (operator && currentValue !== null) {
            const result = calculate();
            setDisplay(String(result));
            setCurrentValue(result);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };

    const calculate = (): number => {
        const prev = currentValue!;
        const next = parseFloat(display);

        switch (operator) {
            case "+":
                return prev + next;
            case "-":
                return prev - next;
            case "*":
                return prev * next;
            case "/":
                return prev / next;
            default:
                return next;
        }
    };

    const handleClearClick = () => {
        setDisplay("0");
        setCurrentValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const handleDecimalClick = () => {
        if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const handlePercentageClick = () => {
        const currentValue = parseFloat(display);
        const newValue = currentValue / 100;
        setDisplay(String(newValue));
    };

    // Function to add the operator sign to the display
    const displayWithSign = (): string => {
        if (currentValue !== null && operator !== null) {
            return `${currentValue} ${operator} `;
        }
        return display;
    };

    return (
        <div className="cal bg-cover bg-center p-4 rounded-lg shadow-sm w-full h-screen flex flex-col justify-center items-center"
           >
            <h1 className="text-2xl font-bold mb-4 text-center text-[#232525] drop-shadow-md outline-black">Calculator</h1>
            <div className="text-center font-bold bg-[#93e0e6] text-black p-2 rounded-md mb-4 shadow-inner w-full max-w-xs">{displayWithSign()}</div>
            <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(7)}>7</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(8)}>8</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(9)}>9</button>
                <button className="bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={() => handleOperatorClick("/")}>/</button>

                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(4)}>4</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(5)}>5</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(6)}>6</button>
                <button className="bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={() => handleOperatorClick("*")}>*</button>

                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(1)}>1</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(2)}>2</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(3)}>3</button>
                <button className="bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={() => handleOperatorClick("-")}>-</button>

                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={handleDecimalClick}>.</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={() => handleNumberClick(0)}>0</button>
                <button className="bg-black text-[#93e0e6] p-4 rounded-md hover:bg-[#93e0e6] hover:text-black" onClick={handlePercentageClick}>%</button>
                <button className="bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={() => handleOperatorClick("+")}>+</button>

                <button className="col-span-2 bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={handleEqualsClick}>=</button>
                <button className="col-span-2 bg-[#93e0e6] text-black p-4 rounded-md hover:bg-black hover:text-[#93e0e6]" onClick={handleClearClick}>C</button>
            </div>
        </div>
    );
};

export default Cal;
