let dataSiswa = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    dataSiswa = data;
    render();
  });

function render() {

  const tabel1 = document.getElementById('semester1');
  const tabel2 = document.getElementById('semester2');

  const search = document.getElementById('search').value.toLowerCase();

  tabel1.innerHTML = "";
  tabel2.innerHTML = "";

  dataSiswa
    .filter(siswa => siswa.nama.toLowerCase().includes(search))
    .forEach((siswa, index) => {

      tabel1.innerHTML += `
        <tr>
          <td>${siswa.nama}</td>

          <td>${siswa.semester1.sakit}</td>
          <td>${siswa.semester1.izin}</td>
          <td>${siswa.semester1.alpha}</td>

          <td>
            <div class="aksi">

              <button onclick="tambah(${index}, 'semester1', 'sakit')">S+</button>
              <button onclick="kurang(${index}, 'semester1', 'sakit')">S-</button>

              <button onclick="tambah(${index}, 'semester1', 'izin')">I+</button>
              <button onclick="kurang(${index}, 'semester1', 'izin')">I-</button>

              <button onclick="tambah(${index}, 'semester1', 'alpha')">A+</button>
              <button onclick="kurang(${index}, 'semester1', 'alpha')">A-</button>

            </div>
          </td>
        </tr>
      `;

      tabel2.innerHTML += `
        <tr>
          <td>${siswa.nama}</td>

          <td>${siswa.semester2.sakit}</td>
          <td>${siswa.semester2.izin}</td>
          <td>${siswa.semester2.alpha}</td>

          <td>
            <div class="aksi">

              <button onclick="tambah(${index}, 'semester2', 'sakit')">S+</button>
              <button onclick="kurang(${index}, 'semester2', 'sakit')">S-</button>

              <button onclick="tambah(${index}, 'semester2', 'izin')">I+</button>
              <button onclick="kurang(${index}, 'semester2', 'izin')">I-</button>

              <button onclick="tambah(${index}, 'semester2', 'alpha')">A+</button>
              <button onclick="kurang(${index}, 'semester2', 'alpha')">A-</button>

            </div>
          </td>
        </tr>
      `;
    });
}

function tambah(index, semester, jenis) {
  dataSiswa[index][semester][jenis]++;
  render();
  simpan();
}

function kurang(index, semester, jenis) {
  if (dataSiswa[index][semester][jenis] > 0) {
    dataSiswa[index][semester][jenis]--;
    render();
    simpan();
  }
}

function simpan() {
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataSiswa)
  });
}

document.getElementById('search').addEventListener('input', render);