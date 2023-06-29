module.exports = {
  commands: [
    [
      "styles",
      {
        fileId: "Bd56mlsxWgNyrvlzGdH90T",
        onlyFromPages: ["Design system"],
        outputters: [
          // https://www.npmjs.com/package/@figma-export/output-styles-as-sass
          require("@figma-export/output-styles-as-sass")({
            output: "./styles",
            getExtension: () => "SCSS",
            getFilename: () => "_figma",
          }),
        ],
      },
    ],
  ],
};
