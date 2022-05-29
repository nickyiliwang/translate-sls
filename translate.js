const AWS = require("aws-sdk");

const translate = new AWS.Translate();

module.exports.handler = async (event) => {
  const { text, lang } = JSON.parse(event.body);

  if (!text || !lang) {
    return {
      statusCode: 400,
      body: { message: "no text or lang present" },
    };
  }

  try {
    const params = {
      Text: text,
      SourceLanguageCode: "en",
      TargetLanguageCode: lang,
    };

    const translated = await translate.translateText(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(translated),
    };
  } catch (error) {
    console.log("error in the translation", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
