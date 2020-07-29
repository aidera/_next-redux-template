const getDocument = () => {
  const aScript = document.createElement("script");
  aScript.type = "text/javascript";
  aScript.src = " https://js.stripe.com/v3/";

  document.head.appendChild(aScript);
  return aScript;
};

export default getDocument;
