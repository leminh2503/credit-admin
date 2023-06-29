// Script to generate Icon Gallery preview
const fs = require("fs");

const exportFile = fs.readFileSync("./components/Icon/index.ts", {
  encoding: "utf8",
});
const exportFileLines = exportFile.split("\n");
const components = exportFileLines.map((line) => {
  return line.replace(/.+as |}.+/g, "");
});

const renderIcon = (iconComponent) =>
  `      <div className="flex flex-col items-center justify-center">
      <${iconComponent} />
      <span>${iconComponent}</span>
    </div>`;

let iconGalleryContent = `import React from "react";
import dynamic from 'next/dynamic';
${components
  .map(
    (component, i) => `
const ${component} = dynamic(() => import("@components/Icon/${component}"));`
  )
  .slice(0, -1)
  .join("")}
export default function IconGallery(): JSX.Element {
  return (
    <div className="grid gap-4" style={{gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))"}}>
${components
  .map((component, i) =>
    i === 0 ? `${renderIcon(component)}` : `\n${renderIcon(component)}`
  )
  .slice(0, -1)
  .join("")}
    </div>
  );
}
`;

fs.writeFileSync("./pages/icon-gallery.tsx", iconGalleryContent);
