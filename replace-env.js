const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, 'src/environments/environment.prod.ts');
const apiBaseUrl = process.env.API_BASE_URL || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';

fs.readFile(envFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    process.exit(1);
  }

  const result = data.replace(/%%API_BASE_URL%%/g, apiBaseUrl);

  fs.writeFile(envFile, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      process.exit(1);
    }
    console.log('API_BASE_URL replaced with:', apiBaseUrl);
  });
});