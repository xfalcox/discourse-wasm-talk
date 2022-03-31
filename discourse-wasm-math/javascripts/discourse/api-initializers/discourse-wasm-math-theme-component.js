import { apiInitializer } from "discourse/lib/api";
import { getAbsoluteURL } from "discourse-common/lib/get-url";

async function applyMath(element, key = "composer") {
  const maths = element.querySelectorAll("pre[data-code-wrap=wasm-math]");

  if (!maths.length) {
    return;
  }

  let wasm = await WebAssembly.instantiateStreaming(fetch(getAbsoluteURL(settings.theme_uploads.wasm_math_bg)));

  maths.forEach((math, index) => {
    let addends = math.attributes['data-code-sum'].value.split('+').map((i) => parseInt(i));
    
    const sum = wasm.instance.exports.sum(...addends);

    math.innerHTML = `<span class="math-result">${addends[0]} + ${addends[1]} = ${sum}</span>`;
  });
  
}

export default apiInitializer("0.11.1", (api) => {
  api.decorateCookedElement(
    async (elem, helper) => {
      const id = helper ? `post_${helper.getModel().id}` : "composer";
      applyMath(elem, id);
    },
    { id: "discourse-wasm-math" }
  );
});
