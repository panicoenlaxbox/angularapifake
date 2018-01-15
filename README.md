# API Fake

<http://json-schema.org/>

Implementaciones de .NET de JSON Schema
<http://json-schema.org/implementations.html#validator-dotnet>

*An online, interactive JSON Schema validator. Supports JSON Schema Draft 3, Draft 4 and Draft 6.* <https://www.jsonschemavalidator.net/>

Podemos generar un esquema a partir de una clase C# <https://www.newtonsoft.com/jsonschema/help/html/GeneratingSchemas.htm>

Desde JSON generar un esquema, desde aplicación on-line <https://jsonschema.net/> o de forma programática <https://github.com/Nijikokun/generate-schema>

Generar JSON a partir de un esquema *propietario*
<https://www.json-generator.com/>

**JSON Schema Faker** sirve para generar JSON a partir de un esquema
<https://github.com/json-schema-faker/json-schema-faker>

Con **faker.js**, mejora la generación de datos que se hace con JSON Schema Faker
<https://www.npmjs.com/package/faker> <https://github.com/Marak/Faker.js>
En <https://rawgit.com/Marak/faker.js/master/examples/browser/index.html> tenemos una aplicación para ver en directo las posibilidades que tiene faker.js

Con **json-server**, levantamos en local un servidor con una API REST completamente operativo con datos desde un fichero en disco, que además se actualizará con los cambios hechos a través de la API
<https://github.com/typicode/json-server>

**JSONView**, un plugin para Chrome para ver bonito JSON
<https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?utm_source=chrome-app-launcher-info-dialog>

**JSONPlaceholder** es una API REST pública hecha con json-server y que está ahí lista para ser usada por cualquiera para una prueba rápida
<https://jsonplaceholder.typicode.com/>

Con **now**, podemos subir a internet la API REST creada con json-server, para que deje de estar sólo en local
<https://www.npmjs.com/package/now>
<https://github.com/zeit/now-cli>

A partir de JSON, crear una interface de TypeScript
<https://jvilk.com/MakeTypes/>

A partir de un esquema, crear una interface de TypeScript, esto no es una web sino un paquete de npm
<https://www.npmjs.com/package/json-schema-to-typescript>

En Visual Studio, Edit > Paste Special > Paste JSON As Classes

Postman

Swagger

<http://www.mock-server.com/>

```npm i json-schema-faker faker json-server --save-dev```

## generate-api-data.js

```javascript

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
  data.sample = sample;
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

```

## package.json

```javascript

"generate-api-data": "node src/api/generate-data",

"preapi-data": "npm run generate-api-data",

"api-data": "json-server src/api/db.json"

```