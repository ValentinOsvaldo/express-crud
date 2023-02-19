import 'dotenv/config';
import 'reflect-metadata';
import app from './app';
import AppDataSource from './db';

async function main() {
  try {
    await AppDataSource.initialize();

    app.listen(process.env['PORT'], () => {
      console.log(`🚀 Server is running in port ${process.env['PORT']}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
