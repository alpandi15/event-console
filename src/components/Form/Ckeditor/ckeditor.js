const init = async (
  el,
  editorBuild,
  {
    props,
    cacheData,
  }
) => {
  // Initial data
  cacheData.current = props.value;
  props.config.initialData = props.value;

  // Init CKEditor
  const editor = await editorBuild.create(el, props.config);

  // Attach CKEditor instance
  el.CKEditor = editor;

  // Set initial disabled state
  props.disabled && editor.enableReadOnlyMode("ckeditor");

  // Set on change event
  editor.model.document.on("change:data", () => {
    const data = editor.getData();
    cacheData.current = data;
    props.onChange(data);
  });

  // Set on focus event
  editor.editing.view.document.on("focus", (evt) => {
    if (props.onFocus) {
      props.onFocus(evt, editor);
    }
  });

  // Set on blur event
  editor.editing.view.document.on("blur", (evt) => {
    if (props.onBlur) {
      props.onBlur(evt, editor);
    }
  });

  // Set on ready event
  if (props.onReady) {
    props.onReady(editor);
  }
};

// Watch model change
const updateData = (
  el,
  {
    props,
    cacheData,
  }
) => {
  if (cacheData.current !== props.value) {
    el.CKEditor.setData(props.value);
  }
};

export { init, updateData };
