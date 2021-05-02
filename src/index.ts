import 'reflect-metadata';
import { config } from 'dotenv';
import { ExpenseTrackerApp } from './app';
import AppInitializer from './app/AppInitializer';

config();
const app = ExpenseTrackerApp.create();
const port = Number(process.env.PORT);

// Start server
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}!`);
  await AppInitializer.init()
});
