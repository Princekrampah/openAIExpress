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
  
    if (textInput === "") {
      alert("Please add in some text and instructions");
      return;
    }
  
    executeInstruction(textInput);
  }
  
  const executeInstruction = async (textInput) => {
    show();
    try {
      const response = await fetch("/openAI/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: textInput,
        }),
      });
  
      if (!response.ok) {
        hide();
        alert("Error Occured :(");
        throw new Error("Error occured :(");
      }
  
      const data = await response.json();
      // console.log(data.imageURL);
  
      // display text
      const imageSection = document.querySelector("#image-section");
      imageSection.src = data.imageURL;
      hide();
    } catch (error) {
      hide();
      console.log(error);
      alert(error);
    }
  };
  
  document.querySelector("#input-form").addEventListener("submit", onSubmit);