let listItems = {
  JS: "left",
  HTML: "left",
  CSS: "left",
  TS: "left",
  React: "right",
  Angular: "right",
  Vue: "right",
  Svelte: "right",
};
let uls = document.querySelectorAll("ul");
let left_list = document.querySelector(".leftList");
let right_list = document.querySelector(".rightList");
let all_right_btn = document.querySelector(".all-right");
let all_left_btn = document.querySelector(".all-left");
let left_btn = document.querySelector(".left");
let right_btn = document.querySelector(".right");

function renderList(obj) {
  left_list.firstElementChild.innerHTML = "";
  right_list.firstElementChild.innerHTML = "";
  for (let item in obj) {
    let li = document.createElement("li");
    li.innerHTML = ` <label><input name=${item} type="checkbox" />${item}</label>`;
    li.addEventListener("change", () => {
      let input = li.getElementsByTagName("input")[0];
      if (input.checked) {
        obj[item] = obj[item] === "left" ? "right" : "left";
      }
    });
    if (obj[item] === "left") {
      left_list.firstElementChild.appendChild(li);
    } else {
      right_list.firstElementChild.appendChild(li);
    }
  }
}

renderList(listItems);

left_btn.addEventListener("click", () => {
  renderList(listItems);
});

right_btn.addEventListener("click", () => {
  renderList(listItems);
});

all_right_btn.addEventListener("click", () => {
  for (let item in listItems) {
    listItems[item] = "right";
  }
  renderList(listItems);
});

all_left_btn.addEventListener("click", () => {
  for (let item in listItems) {
    listItems[item] = "left";
  }
  renderList(listItems);
});
