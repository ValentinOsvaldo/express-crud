import { DataSource } from 'typeorm';
import Post from '../entities/Post.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['HOST'],
  port: Number(process.env['PORT_DB']),
  username: 'postgres',
  password: process.env['PASSWORD'],
  database: 'typeorm',
  entities: [Post],
  logging: true,
  synchronize: true,
});

export default AppDataSource;
