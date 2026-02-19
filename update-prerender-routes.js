const fs = require('fs');
const path = require('path');

// Read the prerender routes from the generated JSON
const routesPath = path.join(__dirname, 'src', 'prerender-routes.json');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf-8'));

// Normalize routes: remove leading slash if present
const normalizedRoutes = routes.map(route => route.startsWith('/') ? route.slice(1) : route);

// Read angular.json
const angularJsonPath = path.join(__dirname, 'angular.json');
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

// Update prerender routes
if (angularJson.projects['guia-noivas'].architect.prerender) {
  angularJson.projects['guia-noivas'].architect.prerender.options.routes = normalizedRoutes;
}

// Write back
fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));

console.log(`Updated angular.json with ${normalizedRoutes.length} prerender routes`);
