let gridSize = 20 * 20;
const container = document.querySelector("#container");
const rainbow = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 128, 0)", 
    "rgb(255, 0, 128)", "rgb(128, 255, 0)", "rgb(0, 255, 128)", "rgb(128, 0, 255)", 
    "rgb(0, 128, 255)", "rgb(255, 255, 0)", "rgb(255, 0, 255)", "rgb(0, 255, 255)"];

createGrid();

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        const divCreator = makeOneDiv();
        divCreator.addEventListener("mouseover", changeColor);
        container.appendChild(divCreator);
    }
}

function makeOneDiv () {
    const div = document.createElement("div");
    div.style.backgroundColor = "rgb(255, 255, 255)";
    return div;
}

let colorChanger = "rgb(0, 0, 255)";

document.querySelector("#default").addEventListener("click", () => colorChanger = "rgb(0, 0, 255)");
document.querySelector("#rainbow").addEventListener("click", () => colorChanger = "rainbow");
document.querySelector("#grayscale").addEventListener("click", () => colorChanger = "grayscale");  

function changeColor(event) {
    if (colorChanger !== "grayscale" && colorChanger !== "rainbow")
        event.target.style.backgroundColor = colorChanger;
    else if (colorChanger === "rainbow") {
        console.log(rainbow[Math.random() * 13]);
        event.target.style.backgroundColor = rainbow[Math.round(Math.random() * 13)];
    }
    else {
        let newRGB = grayscaler(event.target.style.backgroundColor);
        event.target.style.backgroundColor = newRGB;
    }
}

function grayscaler(RGBvalue) {
    let RGBarray = RGBvalue.match(/\d+/g).map(Number);

    if (RGBarray[0] === RGBarray[1] && RGBarray[1] === RGBarray[2]) {
        if (RGBarray[0] === 0) 
            return "rgb(0, 0, 0)"; //keeps div black if it is already black

        return `rgb(${RGBarray[0] - 51}, ${RGBarray[1] - 51}, ${RGBarray[2] - 51})`;
    }

    return "rgb(204, 204, 204)"; //starting gray rgb values
}

function resetGrid() {
    container.innerHTML = "";
    createGrid();
}

let root = document.documentElement;
const gridButton = document.querySelector("#set-grid-size");

function resize(num) {
    let squares = num;

    if (num < 1) {
        do {
            squares = Number(prompt("Please enter a positive, nonzero integer:"));
        } while(!(squares > 0 && Number.isInteger(squares)));
    }

    root.style.setProperty("--gridRows", squares);
    root.style.setProperty("--gridColumns", squares);
    gridSize = Math.pow(squares, 2);

    resetGrid();
}