const {pascalCase} = require("@figma-export/utils");

module.exports = {
  commands: [
    [
      "components",
      {
        fileId: "0hfW206cgPGjJ3GRHJ9pAP",
        onlyFromPages: ["octicons-by-github"],
        outputters: [
          require("@figma-export/output-components-as-svgr")({
            output: "./components/Icon",
            getFileExtension: () => ".tsx",
            getDirname: () => ".",
            getExportTemplate: (options) => {
              const reactComponentName = pascalCase(options.basename);
              return `export {default as ${reactComponentName}} from "./${reactComponentName}";`;
            },
            getSvgrConfig: () => ({
              typescript: true,
              icon: true,
              expandProps: "end",
              plugins: [
                "@svgr/plugin-svgo",
                "@svgr/plugin-jsx",
                "@svgr/plugin-prettier",
              ],
              replaceAttrValues: {
                "#000": "currentColor",
              },
              template: ({componentName, props, jsx, exports}, {tpl}) => tpl`
              import React from 'react';
              import {IconWrapper} from "./IconWrapper";
              import {IconWrapperProps} from "./IconWrapper/types";
              ${"\n"}
              function ${componentName}(allProps: IconWrapperProps): JSX.Element {
                const { svgProps: props, ...restProps } = allProps;
                return <IconWrapper icon={${jsx}} {...restProps} />;
              }
              ${"\n"}
              ${exports}
            `,
            }),
          }),
        ],
      },
    ],
  ],
};
