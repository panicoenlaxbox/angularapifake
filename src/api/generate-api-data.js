const jsf = require("json-schema-faker");

jsf.extend("faker", function () {
  let faker = require("faker");
  faker.locale = "es";
  return faker;
});

const fs = require("fs");
const path = require("path");

const schema = {
  "type": "array",
  "minItems": 5,
  "maxItems": 15,
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "minimum": 1,
        // "uniqueItems": true
        "autoIncrement": true // https://github.com/json-schema-faker/json-schema-faker/issues/291
      },
      "name": {
        "type": "string",
        "faker": "name.firstName"
      },
      "age": {
        "type": "integer",
        "minimum": 7,
        "maximum": 41
      }
    },
    "required": ["id", "name", "age"]
  }
};

jsf.resolve(schema).then(function (sample) {
  let data = {};
  data.users = sample;
  const filename = path.join(__dirname, "db.json");
  const json = JSON.stringify(data, null, 2);
  fs.writeFile(filename, json, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log(`Data generated in ${filename}`);
    }
  });
});
