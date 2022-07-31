const { promises: fs } = require('fs');
const axios = require('axios');

const url = process.env.API_URL;
const key = process.env.API_KEY;
const token = process.env.API_TOKEN;

const getDataFromFile = async (path) => {
  const buffer = await fs.readFile(path);
  return JSON.parse(buffer.toString());
};

const saveDataToFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data));
};

const getListIdByName = (name, lists) =>
  lists.find((list) => list.name === name).id;

const getIdList = async (boardId, listName) => {
  const { data } = await axios.get(`${url}/1/boards/${boardId}/lists`, {
    params: {
      key,
      token,
    },
  });

  return getListIdByName(listName, data);
};

const getAuthResponseText = (email, text) => `User with email ${email} ${text}`;

module.exports = {
  getDataFromFile,
  saveDataToFile,
  getListIdByName,
  getIdList,
  getAuthResponseText,
};
