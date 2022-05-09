const $size = document.querySelector("#size");
const $container = document.getElementById("main");
const $color = document.querySelector("#color");
const $gridSize = document.querySelector("#grid-size");

const $clear = document.getElementById("clear");
const $randomBtn = document.getElementById("random");
const $normalBtn = document.getElementById("normal");
const $lightshadeBtn = document.getElementById("lightshade");
const $darkshadeBtn = document.getElementById("darkshade");

let draw = false;
let drawMode = "normal";

$container.addEventListener("mousedown", () => (draw = true));
$container.addEventListener("mouseup", () => (draw = false));

$size.addEventListener("change", () => {
    if ($size.value > 100) {
        $size.value = 100;
        alert("Max value is 100");
    }
    makeGrid($size.value);
});

$clear.addEventListener("click", () => {
    clearCells();
});

$normalBtn.addEventListener("click", (e) => {
    setMode(e);
});

$randomBtn.addEventListener("click", (e) => {
    setMode(e);
});

$lightshadeBtn.addEventListener("click", (e) => {
    setMode(e);
});

$darkshadeBtn.addEventListener("click", (e) => {
    setMode(e);
});

function setMode(e) {
    drawMode = e.target.id;
}

function changePixelColor(wrapper) {
    wrapper.style.backgroundColor = $color.value;
}

function makeGrid(size) {
    $container.style.setProperty("--size", size);
    $container.innerHTML = "";
    $gridSize.textContent = `${size} x ${size}`;
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.className = "pixel";
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

function clearCells() {
    const cells = document.querySelectorAll(".pixel");
    cells.forEach((e) => {
        e.style.backgroundColor = "white";
    });
}

makeGrid($size.value);
