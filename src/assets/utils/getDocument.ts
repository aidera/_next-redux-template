// Use if you have no page/_document and you have a "document is not defined" error

const getDocument = () => {
  const aScript = document.createElement("script");
  aScript.type = "text/javascript";
  aScript.src = " https://js.stripe.com/v3/";

  document.head.appendChild(aScript);
  return aScript;
};

export default getDocument;
