const concurrently = require("concurrently");

concurrently([
    { command: "npm run start:api", name: "API", prefixColor: "blue" },
    { command: "npm run start:app", name: "React App", prefixColor: "green" },
]);
