# Kullanıcı Yönetim Sistemi

Bu proje, ön uç için React ve arka uç için Nest.js ile oluşturulmuş bir Kullanıcı Yönetim Sistemidir. Kullanıcıların kullanıcı verileri üzerinde CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlemlerini gerçekleştirmesine olanak tanır.

## Özellikler

- **Kullanıcı Listeleme**: Arama işleviyle kullanıcıların sayfalandırılmış bir listesini görüntüleyin.
- **Kullanıcı Ekle**: İlgili alanlara sahip yeni bir kullanıcı eklemek için bir modal açın.
- **Kullanıcıyı Düzenle**: Mevcut bir kullanıcının bilgilerini düzenlemek için bir modal açın.
- **Sayfalandırma**: Sayfa başına görüntülenen kullanıcı sayısını kontrol edin.
- **Arama**: Kullanıcıları ad veya soyadına göre filtreleyin.
- **Veri Doğrulama**: Göndermeden önce gerekli alanların doldurulduğundan emin olun.

## Kullanılan Teknolojiler

- **Ön Uç**:
- React
- Ant Design
- API çağrıları için Axios

- **Arka Uç**:
- Node.js
- Nest.js

- **Veritabanı**:

-MySql

API Endpoints:
GET /users: Sayfalandırılmış bir kullanıcı listesi alın.
GET /users/:id: Kullanıcı ayrıntılarını kimliğe göre alın.
POST /users/save: Yeni bir kullanıcı ekleyin.
PUT /users/update: Kullanıcı ayrıntılarını güncelleyin.

Design : 

![Design](https://github.com/user-attachments/assets/e0483f5f-452c-4ff9-86df-18420b78ef0d)

Hashed Password : 

![hashedpassword](https://github.com/user-attachments/assets/d87d3faf-a0ab-4700-90cc-43a0e6f3fcba)

