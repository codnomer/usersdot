import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '7cfcd123', // MySQL şifreni buraya koy
    database: 'usersdb', // Daha önce oluşturduğumuz veritabanı
  };

  // 1. Tüm Kullanıcıları Getir
  async getUsers(page: number, pageSize: number, search: string) {
    const offset = (page - 1) * pageSize; // Offset hesaplama
    const connection = await createConnection(this.connectionConfig);

    // Arama terimi oluştur
    const searchQuery = search ? `%${search}%` : '%';

    // SQL sorgusu
    const query = `
      SELECT * FROM users
      WHERE name LIKE ? OR surname LIKE ?
      LIMIT ? OFFSET ?
    `;

    try {
      //console.log(query, 'QUERY');
      // Sorguyu çalıştırırken LIMIT ve OFFSET'in sayısal değer olduğundan emin olun
      const [rows] = await connection.query(query, [
        searchQuery,
        searchQuery,
        parseInt(pageSize.toString(), 10), // Sayısal veri sağla
        parseInt(offset.toString(), 10), // Sayısal veri sağla
      ]);

      // Toplam kullanıcı sayısını çek
      const [total] = await connection.query(
        `SELECT COUNT(*) as total FROM users WHERE name LIKE ? OR surname LIKE ?`,
        [searchQuery, searchQuery],
      );

      return { data: rows, total: total[0].total };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Failed to fetch users');
    } finally {
      await connection.end();
    }
  }

  // 2. ID'ye Göre Kullanıcıyı Getir
  async getUserById(id: number) {
    const connection = await createConnection(this.connectionConfig);

    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows]: any = await connection.query(query, [id]); // rows'u destructure ile alıyoruz

    await connection.end();

    return rows.length ? rows[0] : null; // Eğer veri varsa döndür, yoksa null döndür
  }

  // 3. Yeni Kullanıcı Kaydet
  async saveUser(userData: any) {
    const connection = await createConnection(this.connectionConfig);

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const query = `
      INSERT INTO users (name, surname, email, password, phone, age, country, district, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      await connection.query(query, [
        userData.name,
        userData.surname,
        userData.email,
        hashedPassword,
        userData.phone,
        userData.age,
        userData.country,
        userData.district,
        userData.role,
      ]);
      return { message: 'User saved successfully' };
    } catch (error) {
      console.error('Error saving user:', error);
      throw new InternalServerErrorException('Failed to save user');
    } finally {
      await connection.end();
    }
  }

  // 4. Kullanıcıyı Güncelle
  async updateUser(userData: any) {
    const connection = await createConnection(this.connectionConfig);

    const query = `
      UPDATE users
      SET name = ?, surname = ?, email = ?, phone = ?, age = ?, country = ?, district = ?, role = ?
      WHERE id = ?
    `;

    await connection.query(query, [
      userData.name,
      userData.surname,
      userData.email,
      userData.phone,
      userData.age,
      userData.country,
      userData.district,
      userData.role,
      userData.id, // Güncellenecek ID
    ]);

    await connection.end();

    return { message: 'User updated successfully' };
  }
  async getAllUsers() {
    const connection = await createConnection(this.connectionConfig);

    const query = 'SELECT * FROM users';
    const [rows] = await connection.query(query);

    await connection.end();
    console.log(rows); // Verileri konsola yazdır

    return rows; // Verileri döndür
  }

  // 5. Mock Veriler Oluştur (İlk Veri Kaydı için)
  async createMockData() {
    const connection = await createConnection(this.connectionConfig);

    // Mock kullanıcı verileri
    const mockUsers = [
      {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@gmail.com',
        password: 'password1', // Bu veri hashlenecek
        phone: '123456789',
        age: 30,
        country: 'USA',
        district: 'NY',
        role: 'admin',
      },
      {
        name: 'Jane',
        surname: 'Doe',
        email: 'jane.doe@gmail.com',
        password: 'password2',
        phone: '987654321',
        age: 25,
        country: 'USA',
        district: 'LA',
        role: 'user',
      },
    ];

    // Kullanıcıları veritabanına ekle
    for (const user of mockUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await connection.query(
        `INSERT INTO users (name, surname, email, password, phone, age, country, district, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.name,
          user.surname,
          user.email,
          hashedPassword, // Şifreyi hashle ve kaydet
          user.phone,
          user.age,
          user.country,
          user.district,
          user.role,
        ],
      );
    }

    await connection.end();
  }
}
