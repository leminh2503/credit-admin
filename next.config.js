const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: [
    "kitchen-flow-editor",
    "@ant-design/pro-editor",
    "zustand",
    "leva",
    "antd",
    "tinymce",
    "tinymce/tinymce",
    "tinymce/icons/default",
    "tinymce/themes/silver",
    "tinymce/plugins/paste",
    "tinymce/plugins/link",
    "tinymce/plugins/image",
    "tinymce/plugins/table",
    "tinymce/skins/ui/oxide/skin.min.css",
    "tinymce/skins/ui/oxide/content.min.css",
    "tinymce/skins/content/default/content.min.css",
    "@ant-design/plots",
    "@ant-design/icons",
    "@ant-design/input",
    "@ant-design/icons-svg",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-list",
    "@ant-design/pro-descriptions",
    "@ant-design/pro-form",
    "@ant-design/pro-skeleton",
    "@ant-design/pro-field",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "@ant-design/pro-card",
    "@ant-design/pro-table",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip",
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./global";`,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // From https://nanxiaobei.medium.com/disable-css-modules-in-next-js-project-756835172b6e
    // remove css module
    // Find and remove NextJS css rules.
    // for next@12, try `config.module.rules[2]...`
    // console.log(JSON.stringify(config.module.rules))
    if (config.module.rules[1].oneOf) {
      config.module.rules[1].oneOf.forEach((one) => {
        if (!`${one.issuer ? one.issuer.and : "undefined"}`.includes("_app"))
          return;
        one.issuer.and = [path.resolve(__dirname)];
      });
    }

    return config;
  },
});
