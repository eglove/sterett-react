type SetMetaProperties = {
  description: string;
  title: string;
};

export function setMeta({ description, title }: SetMetaProperties) {
  document.title = title;
  const descriptionElement = document.createElement("meta");
  descriptionElement.name = "description";
  descriptionElement.content = description;
  document.querySelector("head")?.append(descriptionElement);
}
