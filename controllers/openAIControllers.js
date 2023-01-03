const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const getEdit = async (req, res) => {
  const { input, instruction } = req.body;

  try {
    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: input,
      instruction: instruction,
    });
    res.status(200).json({ success: true, msg: response.data });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "Edit could not be generated, try again",
    });
  }
};

const getImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    image_url = response.data.data[0].url;

    res.status(200).json({ success: true, imageURL: image_url });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "Edit could not be generated, try again",
    });
  }
};

module.exports = { getEdit, getImage };
