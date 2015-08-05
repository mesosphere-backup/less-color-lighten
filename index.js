// USAGE: color-lighten(@neutral, 50);

function getColorLightenFunction(less) {

  function rgba() {
    var rgbaFunc = less.functions.functionRegistry.get("rgba");
    return rgbaFunc.apply(null, arguments);
  }

  return function (color, amount) {
    var baseRGB = [255, 255, 255];
    var value = amount.value / 100;

    if (value < 0) {
      baseRGB = [0, 0, 0];
      value = -1 * value;
    }

    return rgba(
      Math.round((baseRGB[0] - color.rgb[0]) * value) + color.rgb[0],
      Math.round((baseRGB[1] - color.rgb[1]) * value) + color.rgb[1],
      Math.round((baseRGB[2] - color.rgb[2]) * value) + color.rgb[2],
      color.alpha
    );
  };
}

module.exports = {
  install: function (less) {
    less.functions.functionRegistry.add(
      "color-lighten",
      getColorLightenFunction(less)
    );
  }
};
