const $size = document.querySelector("#size");
const $container = document.getElementById("main");
const $color = document.querySelector("#color");
const $gridSize = document.querySelector("#grid-size");

const $clear = document.getElementById("clear");
const $randomBtn = document.getElementById("random");
const $normalBtn = document.getElementById("normal");
const $lightshadeBtn = document.getElementById("lightshade");
const $darkshadeBtn = document.getElementById("darkshade");
const $gridBorderBtn = document.getElementById("togglepixelborder");

const modeBtns = document.querySelectorAll(".mode");

let gridBoard = false;
let draw = false;
let drawMode = "normal";
let defaultPixelColor = "rgba(255,255,255,1)";

//####################### LISTENERS #######################

$gridBorderBtn.addEventListener("click", toggleGridBorder);

// set if is drawing
$container.addEventListener("mousedown", () => (draw = true));
$container.addEventListener("mouseup", () => (draw = false));

// change the grid when range changes
$size.addEventListener("change", () => {
    if ($size.value > 100) {
        $size.value = 100;
        alert("Max value is 100");
    }
    makeGrid($size.value);
});

// reset the grid
$clear.addEventListener("click", clearCells);

// add a click event to all mode buttons
modeBtns.forEach((btn) => btn.addEventListener("click", (e) => setDrawMode(e)));

//####################### FUNCTIONS #######################

// set the draw mode and highlight the button
function setDrawMode(event) {
    drawMode = event.target.id;
    modeBtns.forEach((btn) => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");
}

// paint pixel in chosen color
function changePixelColor(wrapper) {
    let opacity = parseFloat(window.getComputedStyle(wrapper).getPropertyValue("opacity"));
    if (drawMode === "normal") {
        wrapper.style.backgroundColor = $color.value;
        opacity = 1;
        wrapper.style.setProperty("--opacity", opacity);
    } else if (drawMode === "random") {
        wrapper.style.backgroundColor = `rgb(
        ${Math.random() * 255},
        ${Math.random() * 255},
        ${Math.random() * 255})`;
    } else if (drawMode === "lightshade") {
        let min = opacity;
        min = min - 0.1;
        if (min < 0) {
            min = 0;
        }
        wrapper.style.setProperty("opacity", min);
    } else if (drawMode === "darkshade") {
        let max = opacity;
        max = max + 0.1;
        if (max > 1) {
            max = 1;
        }
        wrapper.style.setProperty("opacity", max);
    }
}

// draw grid of pixels in the chosen size
function makeGrid(size) {
    $container.style.setProperty("--size", size);
    $container.innerHTML = "";
    $gridSize.textContent = `${size} x ${size}`;
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        if (gridBoard) {
            div.className = "pixel border";
        } else {
            div.className = "pixel";
        }
        div.addEventListener("mouseover", () => {
            if (draw) {
                changePixelColor(div);
            }
        });
        div.addEventListener("mousedown", () => {
            changePixelColor(div);
        });
        $container.append(div);
    }
}

// reset the grid to default values
function clearCells() {
    const cells = document.querySelectorAll(".pixel");
    cells.forEach((e) => {
        e.style.backgroundColor = defaultPixelColor;
        e.style.opacity = 1;
    });
}

function toggleGridBorder() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => pixel.classList.toggle("border"));
    gridBoard = !gridBoard;
}

// draw a default grid (16x16 pixels)
makeGrid($size.value);
