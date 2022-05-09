const $container = document.getElementById("main");

let divQuantity = 16;

function changeColor(wrapper) {
    wrapper.classList.add("active");
}

for (let i = 0; i < divQuantity * divQuantity; i++) {
    const div = document.createElement("div");
    div.className = "square-div";
    div.textContent = i + 1;
    div.addEventListener("mouseenter", () => {
        changeColor(div);
    });
    $container.append(div);
}
