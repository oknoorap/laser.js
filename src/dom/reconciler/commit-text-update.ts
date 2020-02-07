import TextInstance from "../instance/text";

const commitTextUpdate = (
  textInstance: TextInstance,
  oldText: string,
  newText: string
) => {
  if (oldText !== newText) {
    textInstance.setText(newText);
  }
};

export default commitTextUpdate;
