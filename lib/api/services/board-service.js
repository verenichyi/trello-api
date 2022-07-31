const axios = require('axios');
const path = require('path');
const { getDataFromFile, saveDataToFile } = require('../../utils');

const url = process.env.API_URL;
const key = process.env.API_KEY;
const token = process.env.API_TOKEN;
const boardsPath = path.resolve(__dirname, '..', 'data', 'boards.json');
const cardsPath = path.resolve(__dirname, '..', 'data', 'cards.json');

class BoardService {
  async getBoard(id) {
    const { data } = await axios.get(`${url}/1/boards/${id}`, {
      params: {
        key,
        token,
      },
    });

    return data;
  }

  async createBoard(board) {
    const { data } = await axios.post(`${url}/1/boards`, {
      ...board,
      key,
      token,
    });

    const boards = await getDataFromFile(boardsPath);
    const newBoards = [...boards, data];
    await saveDataToFile(boardsPath, newBoards);

    return data;
  }

  async updateBoard(board) {
    const { data } = await axios.put(`${url}/1/boards/${board.id}`, {
      ...board,
      key,
      token,
    });

    const boards = await getDataFromFile(boardsPath);
    const newBoards = boards.map((item) => {
      if (item.id === board.id) {
        return {
          ...data,
        };
      }

      return item;
    });
    await saveDataToFile(boardsPath, newBoards);

    return data;
  }

  async deleteBoard(id) {
    await axios.delete(`${url}/1/boards/${id}`, {
      params: {
        key,
        token,
      },
    });

    const boards = await getDataFromFile(boardsPath);
    const cards = await getDataFromFile(cardsPath);
    const newBoards = boards.filter((board) => board.id !== id);
    const newCards = cards.filter((card) => card.idBoard !== id);
    await saveDataToFile(boardsPath, newBoards);
    await saveDataToFile(cardsPath, newCards);
  }
}

module.exports = new BoardService();
