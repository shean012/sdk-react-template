module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 350,
      // viewportHeight: , // 视窗的高度，根据设备的宽度来指定的，也可以不配置
      unitPrecision: 5,
      viewportUnit: "vw",
      minPixelValue: 1,
      mediaQuery: false,
      selectorBlackList: [],
      exclude: /^$/,
    },
  },
}
