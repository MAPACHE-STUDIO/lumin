const { translateMessage: translate } = require('../services/Translate.service');

const TranslateController = {
    async translateMessage (req, res) {
        try {
          const { content, targetLanguage } = req.body;
          const translation = await translate(content, targetLanguage);
          res.status(200).json({ translation });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
};

module.exports = TranslateController