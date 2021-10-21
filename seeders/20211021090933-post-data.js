'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: 'Dikira Salah Pilih Make Up Artist, Pas Selesai Ternyata Malah Bikin Semua Melongo',
      image: 'https://drive.google.com/file/d/1HpFllJU9TgRrzVLTyR9J6KJ-Q_CZt9_1/view?usp=sharing',
      video: 'https://www.youtube.com/watch?v=38ThEuT_awk',
      content: 'Sukabumi- Belum lama ini beredar di media sosial yang menampilkan video transformasi wanita yang kerap dikira bocah kecil (bocil). Penampilannya berubah drastis ketika makeup',
      tag: 'kecantikan',
      postLike: 5,
      postDislike: 9,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Pria Ditembak Polisi Tidak Mempan, Ngamuk Pegang Samurai',
      image: 'https://drive.google.com/file/d/1HpFllJU9TgRrzVLTyR9J6KJ-Q_CZt9_1/view?usp=sharing',
      video: 'https://www.youtube.com/watch?v=CxsbhbBHT7A',
      content: 'Jakarta-  Viral sebuah video memperlihatkan beberapa anggota kepolisian tampak kewalahan menyergap sorang pria yang mengenakan baju merah. Tampak pria berbaju merah tersebut menantang polisi di depan dan di belakangnya sambil mengacung-acungkan pedang samurai.Beberapa kali, anggota kepolisian berusaha membekuknya dengan menggunakan tongkat besi, tapi pria tersebut balik menyerang.',
      tag: 'kriminal',
      postLike: 5,
      postDislike: 9,
      UserId: 2,
      createdAt: new Date(), 
      updatedAt: new Date()
    }, {
      title: 'Anak SD Usia 13 Tahun Nikahi Gadis SMA Usia 17 Tahun, Sempat Pacaran',
      image: 'https://drive.google.com/file/d/1HpFllJU9TgRrzVLTyR9J6KJ-Q_CZt9_1/view?usp=sharing',
      video: 'https://www.youtube.com/watch?v=ajttw3ZVsB0',
      content: 'Sulawesi - Pasangan pernikahan anak di bawah umur, Reski (13) dan Sarmila (17), rupanya masih berstatus sepupu dua kali. Pengantin wanita, Sarmila juga membeberkan bahwa hubungannya telah terjalin setahun terakhir',
      tag: 'viral',
      postLike: 52,
      postDislike: 7,
      UserId: 1,
      createdAt: new Date(), 
      updatedAt: new Date()
    }, {
      title: ' Iron Man Cari Nafkah Di Pontianak Kalimantan Barat Indonesia',
      image: 'https://drive.google.com/file/d/1HpFllJU9TgRrzVLTyR9J6KJ-Q_CZt9_1/view?usp=sharing',
      video: 'https://www.youtube.com/watch?v=7E9RFubOnig',
      content: 'Pontianak - Warga kalimantan digegerkan dengan sesosok iron yang berkeliling pontianak untuk menafkahi keluarganya',
      tag: 'teknologi',
      postLike: 233,
      postDislike: 2,
      UserId: 2,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
