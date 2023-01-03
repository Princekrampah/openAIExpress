function show() {
    const btn = document.getElementById("spinner");
    btn.classList.add("spinner-border", "spinner-border-sm");
    btn.removeAttribute("disabled");
  }
  function hide() {
    const btn = document.getElementById("spinner");
    btn.classList.remove("spinner-border", "spinner-border-sm");
    btn.setAttribute("disabled", "");
  }
  
  function onSubmit(e) {
    e.preventDefault();
    const textInput = document.querySelector("#input").value;
    const instruction = document.querySelector("#instructions").value;
  
    if (textInput === "" || instruction === "") {
      alert("Please add in some text and instructions");
      return;
    }
  
    executeInstruction(textInput, instruction);
  }
  
  const executeInstruction = async (textInput, instruction) => {
    show();
    try {
      const response = await fetch("/openAI/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: textInput,
          instruction: instruction,
        }),
      });
  
      if (!response.ok) {
        hide();
        alert("Error Occured :(");
        throw new Error("Error occured :(");
      }
  
      const data = await response.json();
      // console.log(data.msg.choices[0].text);
  
      // display text
      const outputTextfield = document.querySelector("#output");
      outputTextfield.textContent = data.msg.choices[0].text;
      outputTextfield.style = "visibility: initial";
      hide();
    } catch (error) {
      hide();
      console.log(error);
      alert(error);
    }
  };
  
  document.querySelector("#input-form").addEventListener("submit", onSubmit);