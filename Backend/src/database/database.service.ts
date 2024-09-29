import { Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private async createDatabase() {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: '7cfcd123',
      port: 3306,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS users_db`);
    await connection.end();
  }

  public async createTables() {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: '7cfcd123',
      database: 'usersdb',
    });

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        surname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(20),
        age INT,
        country VARCHAR(255),
        district VARCHAR(255),
        role VARCHAR(50),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.query(createUserTableQuery);

    await connection.end();
  }
}
