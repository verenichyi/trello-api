const axios = require('axios');
const { getDataFromFile, saveDataToFile, getIdList } = require('../../utils');
const path = require('path');

const url = process.env.API_URL;
const key = process.env.API_KEY;
const token = process.env.API_TOKEN;
const cardsPath = path.resolve(__dirname, '..', 'data', 'cards.json');

class CardService {
  async getCard(id) {
    const { data } = await axios.get(`${url}/1/cards/${id}`, {
      params: {
        key,
        token,
      },
    });

    return data;
  }

  async createCard(card) {
    const idList = await getIdList(card.boardId, card.listName);

    const { data } = await axios.post(`${url}/1/cards`, {
      ...card,
      idList,
      key,
      token,
    });

    const cards = await getDataFromFile(cardsPath);
    const newCards = [...cards, data];
    await saveDataToFile(cardsPath, newCards);

    return data;
  }

  async updateCard(id, card) {
    const idList = await getIdList(card.boardId, card.listName);

    const { data } = await axios.put(`${url}/1/cards/${id}`, {
      ...card,
      idList,
      idBoard: card.boardId,
      key,
      token,
    });

    const cards = await getDataFromFile(cardsPath);
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...data,
        };
      }

      return card;
    });
    await saveDataToFile(cardsPath, updatedCards);

    return data;
  }

  async deleteCard(id) {
    await axios.delete(`${url}/1/cards/${id}`, {
      params: {
        key,
        token,
      },
    });

    const cards = await getDataFromFile(cardsPath);
    const newCards = cards.filter((card) => card.id !== id);
    await saveDataToFile(cardsPath, newCards);
  }
}

module.exports = new CardService();
