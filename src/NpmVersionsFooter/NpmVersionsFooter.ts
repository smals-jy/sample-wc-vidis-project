// src/NpmVersionsFooter/NpmVersionsFooter.ts

import versions from "./versions.json";

// Modal Backdrop (the dimmed background)
const backdropStyle = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal Box (the white card)
const modalStyle = `
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  position: relative;
`;

const toggleBtnStyle = `
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
`;

export function createNpmVersionsModal(): HTMLElement {
  // 1. Create the toggle button that stays in the corner
  const openBtn = document.createElement("button");
  openBtn.setAttribute("style", toggleBtnStyle);
  openBtn.textContent = "View NPM Versions";

  // 2. Create the Modal Backdrop
  const backdrop = document.createElement("div");
  backdrop.setAttribute("style", backdropStyle);

  // 3. Create the Modal Content Box
  const modal = document.createElement("div");
  modal.setAttribute("style", modalStyle);
  
  const title = document.createElement("h3");
  title.textContent = "Dependency Versions";
  title.style.marginTop = "0";
  modal.appendChild(title);

  const list = document.createElement("ul");
  list.style.listStyle = "none";
  list.style.padding = "0";

  for (const [name, version] of Object.entries(versions)) {
    const li = document.createElement("li");
    li.style.padding = "0.25rem 0";
    li.style.borderBottom = "1px solid #eee";
    li.innerHTML = `<code>${name}</code>: <b>${version}</b>`;
    list.appendChild(li);
  }
  modal.appendChild(list);

  // Close Button inside Modal
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.style.marginTop = "1rem";
  closeBtn.style.cursor = "pointer";
  modal.appendChild(closeBtn);

  backdrop.appendChild(modal);

  // --- Logic ---

  const show = () => {
    backdrop.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const hide = () => {
    backdrop.style.display = "none";
    document.body.style.overflow = "auto";
  };

  openBtn.onclick = show;
  closeBtn.onclick = hide;
  
  // Close if clicking the backdrop itself
  backdrop.onclick = (e) => {
    if (e.target === backdrop) hide();
  };

  // Return a fragment or a container to append both
  const container = document.createDocumentFragment();
  container.appendChild(openBtn);
  container.appendChild(backdrop);

  return container as unknown as HTMLElement;
}

export default function Footer() {
   document.body.appendChild(createNpmVersionsModal()); 
}

Footer();
