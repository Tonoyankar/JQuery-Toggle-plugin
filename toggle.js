
$.fn.setupToggles = function (options) {
    var params = $.extend({
        toggleOptions     : [{value:0, label:"No"}, {value:1, label: "Yes"}],
        defaultValue : 0,
        onSelectedValueChange: function () {}
      }, options);

  const state = {
    selectedValue: params.defaultValue,
  };
  let me = this;
  let mainToggleDiv = $('<div id="mainToggleDiv" class="selectGroup">');

  function getValue() {
    return $(`#${$(me).attr("id")} #mainToggleDiv .selected`).data("value");
  }

  params.toggleOptions.forEach((option, index) => {
    $(
      `<div class="selectItem ${
        params.defaultValue == option.value ? "selected" : ""
      }" data-value="${option.value}">${option.label}</div>`
    ).appendTo(mainToggleDiv);
    if (index < params.toggleOptions.length - 1) {
      $(`<div class="or"></div>`).appendTo(mainToggleDiv);
    }
  });

  $(me).append(mainToggleDiv);

  $(`#${$(me).attr("id")} #mainToggleDiv .selectItem`).on("click", function () {
    $(`#${$(me).attr("id")} #mainToggleDiv .selectItem`).each(function () {
      $(this).removeClass("selected");
    });
    $(this).toggleClass("selected");

    let selectedValue = getValue();
    if (selectedValue === state.selectedValue) return;
    state.selectedValue = selectedValue;
    params.onSelectedValueChange.call(this, selectedValue);
  });

  return me; // To ensure jQuery chainability 
};
