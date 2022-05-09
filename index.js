const $container = document.getElementById("main");

let divQuantity = 16;

for (let i = 0; i < divQuantity * divQuantity; i++) {
    const div = document.createElement("div");
    div.className = "square-div";
    div.textContent = i+1;
    $container.append(div);
}
