import React, { useState } from "react";
import versions from "./versions.json";
import styles from "./NpmVersionsFooter.module.css";

export const NpmVersionsFooter: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <footer className={styles.footer + (open ? " " + styles.expanded : "")}>
      <button className={styles.toggle} onClick={() => setOpen(v => !v)}>
        NPM versions {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className={styles.content}>
          <ul>
            {Object.entries(versions).map(([name, version]) => (
              <li key={name}>
                <code>{name}</code>: <b>{version}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </footer>
  );
};

export default NpmVersionsFooter;
