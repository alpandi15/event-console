import TomSelect from "tom-select";
import _ from "lodash";

const setValue = (el, props) => {
  if (props.value.length) {
    if (Array.isArray(props.value)) {
      for (const value of props.value) {
        const selectedOption = Array.from(el).find(
          (option) =>
            option instanceof HTMLOptionElement && option.value == value
        );

        if (
          selectedOption !== undefined &&
          selectedOption instanceof HTMLOptionElement
        ) {
          selectedOption.selected = true;
        }
      }
    } else {
      el.value = props.value;
    }
  }
};

const init = (
  originalEl,
  clonedEl,
  props,
  computedOptions
) => {
  // On option add
  if (Array.isArray(props.value)) {
    computedOptions = {
      onOptionAdd: function (value) {
        // Add new option
        const newOption = document.createElement("option");
        newOption.value = value.toString();
        newOption.text = value.toString();
        originalEl.add(newOption);

        // Emit option add
        props.onOptionAdd(value.toString());
      },
      ...computedOptions,
    };
  }

  clonedEl.TomSelect = new TomSelect(clonedEl, computedOptions);

  // On change
  clonedEl.TomSelect.on("change", function (selectedItems) {
    props.onChange(
      Array.isArray(selectedItems) ? [...selectedItems] : selectedItems
    );
  });
};

const getOptions = (
  options,
  tempOptions = []
) => {
  if (options) {
    Array.from(options).forEach(function (optionEl) {
      if (optionEl instanceof HTMLOptGroupElement) {
        getOptions(optionEl.children, tempOptions);
      } else {
        tempOptions.push(optionEl);
      }
    });
  }

  return tempOptions;
};

const updateValue = (
  originalEl,
  clonedEl,
  value,
  props,
  computedOptions
) => {
  // Remove old options
  for (const [optionKey, option] of Object.entries(
    clonedEl.TomSelect.options
  )) {
    if (
      !getOptions(originalEl.children).filter((optionEl) => {
        return (
          optionEl instanceof HTMLOptionElement &&
          optionEl.value === option.value
        );
      }).length
    ) {
      clonedEl.TomSelect.removeOption(option.value);
    }
  }

  // Update classnames
  const initialClassNames = clonedEl
    .getAttribute("data-initial-class")
    ?.split(" ");
  clonedEl.setAttribute(
    "class",
    [
      ...Array.from(originalEl.classList),
      ...Array.from(clonedEl.classList).filter(
        (className) => initialClassNames?.indexOf(className) == -1
      ),
    ].join(" ")
  );
  clonedEl.TomSelect.wrapper.setAttribute(
    "class",
    [
      ...Array.from(originalEl.classList),
      ...Array.from(clonedEl.TomSelect.wrapper.classList).filter(
        (className) => initialClassNames?.indexOf(className) == -1
      ),
    ].join(" ")
  );
  clonedEl.setAttribute(
    "data-initial-class",
    Array.from(originalEl.classList).join(" ")
  );

  // Add new options
  const options = originalEl.children;
  if (options) {
    Array.from(options).forEach(function (optionEl) {
      clonedEl.TomSelect.addOption({
        text: optionEl.textContent,
        value: optionEl.getAttribute("value"),
      });
    });
  }

  // Refresh options
  clonedEl.TomSelect.refreshOptions(false);

  // Update value
  if (
    (!Array.isArray(value) && value !== clonedEl.TomSelect.getValue()) ||
    (Array.isArray(value) && !_.isEqual(value, clonedEl.TomSelect.getValue()))
  ) {
    clonedEl.TomSelect.destroy();
    if (originalEl.innerHTML) {
      clonedEl.innerHTML = originalEl.innerHTML;
    }
    setValue(clonedEl, props);
    init(originalEl, clonedEl, props, computedOptions);
  }
};

export { setValue, init, updateValue };
