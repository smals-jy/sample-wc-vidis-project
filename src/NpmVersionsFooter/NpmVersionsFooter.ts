// src/NpmVersionsFooter/NpmVersionsFooter.ts

import versions from "./versions.json";

// Inline styles as a simple replacement for CSS modules
const footerBase = `
  padding: 1rem;
  background: #f5f5f5;
  font-size: 0.9rem;
  transition: max-height 0.3s;
  overflow: hidden;
  max-height: 2.4em;
`;

const footerExpanded = `
  max-height: 20vh;
`;

const toggleBtnStyle = `
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 0.5em;
`;

const contentStyle = `
  padding-top: 0.75em;
`;

export function createNpmVersionsFooter(): HTMLElement {
  const footer = document.createElement("footer");
  footer.setAttribute("style", footerBase);

  const toggleBtn = document.createElement("button");
  toggleBtn.setAttribute("style", toggleBtnStyle);
  toggleBtn.textContent = "NPM versions ▼";
  footer.appendChild(toggleBtn);

  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("style", contentStyle + "display: none;");
  const list = document.createElement("ul");
  for (const [name, version] of Object.entries(versions)) {
    const li = document.createElement("li");
    li.innerHTML = `<code>${name}</code>: <b>${version}</b>`;
    list.appendChild(li);
  }
  contentDiv.appendChild(list);
  footer.appendChild(contentDiv);

  let open = false;
  toggleBtn.onclick = () => {
    open = !open;
    toggleBtn.textContent = `NPM versions ${open ? "▲" : "▼"}`;
    contentDiv.style.display = open ? "block" : "none";
    footer.setAttribute(
      "style",
      footerBase + (open ? footerExpanded : "")
    );
  };

  return footer;
}

export default function Footer() {
   document.body.appendChild(createNpmVersionsFooter()); 
}

Footer();
