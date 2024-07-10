"use string";
const container = document.querySelector(".container");
const containerArrow = container.querySelector(".container-arrow svg");
const containerAddButton = container.querySelector(".container-button");
const tableBody = container.querySelector("tbody");

let transitionTimeout;

containerArrow.addEventListener("click", () => {
   if (container.classList.contains("active")) {
      container.classList.remove("active");
      window.clearTimeout(transitionTimeout);
   } else {
      container.classList.add("active");
   }
   setContainerHeight();
});

document.body.addEventListener("click", (e) => {
   closeActiveDropdown();
});

function closeActiveDropdown() {
   const activeDropdown = document.querySelector(".dropdown.active");
   if (activeDropdown && !e.target.closest(".dropdown.active")) {
      activeDropdown.classList.remove("active");
   }
}

containerAddButton.addEventListener("click", () => {
   const newComponent = document.createElement("tr");
   for (let i = 0; i < 4; i++) {
      newComponent.innerHTML += `
			<td>
				<div class="dropdown">
					<input type="text" readonly>
					<img src="img/arrow.svg" alt="Стрелка вниз">
					<ul>
						<li><button>SFRN-4204</button></li>
						<li><button>SFRN-4205</button></li>
						<li><button>SFRN-4206</button></li>
						<li><button>SFRN-4207</button></li>
						<li><button>SFRN-4208</button></li>
					</ul>
				</div>
			</td>
		`;
   }
   newComponent.innerHTML += `
		<td>
			<button class="button-delete">
				<img src="img/trash-bin.svg" alt="">
			</button>
		</td>
	`;
   tableBody.append(newComponent);
   setContainerHeight();
});

tableBody.addEventListener("click", (e) => {
   if (e.target.closest("input")) {
      closeActiveDropdown();
      e.target.closest("input").parentElement.classList.add("active");
   } else if (e.target.closest("ul button")) {
      const button = e.target.closest("ul button");
      const dropdown = button.closest(".dropdown");
      dropdown.classList.remove("active");
      dropdown.querySelector("input").value = button.textContent;
   } else if (e.target.closest(".button-delete")) {
      e.target.closest(".button-delete").closest("tr").remove();
      setContainerHeight();
   }
});

function removeTransition() {
   transitionTimeout = setTimeout(() => {
      container.setAttribute(
         "style",
         `transition-duration: 0s; overflow: visible; ${container.getAttribute(
            "style"
         )}`
      );
   }, 300);
}

function setContainerHeight() {
   if (container.classList.contains("active")) {
      const containerTop = container.querySelector(".container-top");
      const containerContent = container.querySelector(".container-content");
      container.style.height = `${
         containerTop.offsetHeight + containerContent.offsetHeight
      }px`;
      removeTransition();
   } else {
      container.removeAttribute("style");
   }
}
setContainerHeight();
