"use string";
const container = document.querySelector(".container");
const containerArrow = container.querySelector(".container-arrow svg");
const containerAddButton = container.querySelector(".container-button");
const tableBody = container.querySelector("tbody");
const tableContainer = container.querySelector(".container-table");

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
   closeActiveDropdown(e, true);
});
window.addEventListener("scroll", (e) => {
   closeActiveDropdown(e);
});
tableContainer.addEventListener("scroll", (e) => {
   closeActiveDropdown(e);
});

window.addEventListener("resize", (e) => {
   closeActiveDropdown(e);
   if (container.classList.contains("active")) {
      container.classList.remove("active");
      setContainerHeight();
   }
});

function closeActiveDropdown(e, onClick = false) {
   const activeDropdown = document.querySelector(".dropdown.active");
   if (onClick) {
      if (activeDropdown && !e.target.closest(".dropdown.active")) {
         activeDropdown.classList.remove("active");
      }
   } else {
      if (activeDropdown) activeDropdown.classList.remove("active");
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
					<div class="dropdown-rect"></div>
					<ul>
						<li><button>SFRN-4204</button></li>
						<li><button>SFRN-4205</button></li>
						<li><button>SFRN-4206</button></li>
						<li><button>SFRN-4207</button></li>
						<li><button>SFRN-4208</button></li>
					</ul>
				</div>
			</td>`;
   }

   newComponent.innerHTML += `
		<td>
			<button class="button-delete">
				<img src="img/trash-bin.svg" alt="">
			</button>
		</td>`;
   tableBody.append(newComponent);
   setContainerHeight();
});

tableBody.addEventListener("click", (e) => {
   if (e.target.closest(".dropdown-rect")) {
      closeActiveDropdown(e, true);
      const dropdown = e.target.closest(".dropdown-rect").parentElement;
      const dropdownInput = dropdown.querySelector("input");
      const dropdownlist = dropdown.querySelector("ul");
      let leftPosition = dropdownInput.getBoundingClientRect().left;
      if (
         dropdownInput.offsetWidth + 10 <
         document.documentElement.clientWidth
      ) {
         if (
            leftPosition + dropdownInput.offsetWidth + 10 >
            document.documentElement.clientWidth
         ) {
            while (
               leftPosition + dropdownInput.offsetWidth + 10 >
               document.documentElement.clientWidth
            )
               leftPosition -= 1;
         } else if (leftPosition < 11) {
            while (leftPosition < 11) leftPosition += 1;
         }
      }
      dropdownlist.setAttribute(
         "style",
         `width: ${dropdownInput.offsetWidth}px; top: ${
            dropdownInput.getBoundingClientRect().top +
            dropdownInput.offsetHeight +
            5
         }px; left: ${leftPosition}px`
      );
      dropdown.classList.contains("active")
         ? dropdown.classList.remove("active")
         : dropdown.classList.add("active");
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
