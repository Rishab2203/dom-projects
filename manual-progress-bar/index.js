let mileStones = {
  1: ["Contact Details", "Add contact details for further communications"],
  2: ["Shipping Address", "Add shipping address to successfully deliver"],
  3: ["Payment", "Complete the payment to complete the order."],
  4: ["Delivered", "Ready to get delivered"],
};

let currentStage = 1;

let status_bar = document.querySelector(".status-bar");
let previous_btn = document.querySelector(".previous-btn");
let progress_bar = document.querySelector(".progress");
let nxt_btn = document.querySelector(".nxt-btn");

let tick_emoji = String.fromCodePoint(10003);
let emoji = String.fromCodePoint(127873);

function statusUpdate(stageCode) {
  let status = document.querySelector(".status");
  if (stageCode <= 4) {
    status.textContent = mileStones[stageCode][1];
    return;
  }

  status.textContent = `Congratualtions order Delivered ${emoji}`;
}

for (let stage in mileStones) {
  let template = document.createElement("div");
  template.innerHTML = `<div class="milestone" id=mil${stage}><span class="stage" >${stage}</span><span> ${mileStones[stage][0]}</span></div>
  `;
  let clone = template.firstElementChild;
  status_bar.appendChild(clone);
  statusUpdate(currentStage);
}

let last_mile = document.querySelector("#mil4");
last_mile.style.transform = "translate(25%,-30%)";

previous_btn.addEventListener("click", (e) => {
  if (progress_bar.style.width !== "0") {
    if (progress_bar.style.width === "99%") {
      nxt_btn.textContent = "Next";
    }
    let value = 99 / 3;
    progress_bar.style.width = `${
      parseInt(progress_bar.style.width.split("%")) - value
    }%`;
  }
  if (currentStage > 1) {
    currentStage--;
  }
  let completed_mile = document.querySelector(`#mil${currentStage}`);

  completed_mile.firstElementChild.textContent = currentStage;
  completed_mile.firstElementChild.classList.toggle("task-complete");
  statusUpdate(currentStage);
});

nxt_btn.addEventListener("click", (e) => {
  let value = 99 / 3;
  if (currentStage <= 4) {
    currentStage++;
  }
  statusUpdate(currentStage);
  let completed_mile = document.querySelector(`#mil${currentStage - 1}`);

  completed_mile.firstElementChild.textContent = tick_emoji;
  completed_mile.firstElementChild.classList.toggle("task-complete");

  if (e.target.textContent === "Next" && progress_bar.style.width == 0) {
    previous_btn.removeAttribute("disabled");
    progress_bar.style.width = `${value}%`;
    return;
  }
  if (parseInt(progress_bar.style.width.split("%")) < 99) {
    progress_bar.style.width = `${
      parseInt(progress_bar.style.width.split("%")) + value
    }%`;
  }
  if (progress_bar.style.width === "99%") {
    e.target.textContent = "Finish";
  }

  if (e.target.textContent === "Finish") {
    statusUpdate(currentStage);
  }
});
