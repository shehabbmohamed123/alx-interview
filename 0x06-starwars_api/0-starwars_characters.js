#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3 || isNaN(process.argv[2])) {
  process.exit(1);
}

const filmId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  const charactersUrls = JSON.parse(body).characters;
  const characterPromises = charactersUrls.map((characterUrl) => {
    return new Promise((resolve, reject) => {
      request(characterUrl, (charError, charResponse, charBody) => {
        if (charError) {
          reject(charError);
        } else {
          resolve(JSON.parse(charBody).name);
        }
      });
    });
  });

  Promise.all(characterPromises)
    .then((names) => {
      names.forEach((name) => {
        console.log(name);
      });
    })
    .catch((promiseError) => {
      console.error(promiseError);
    });
});
