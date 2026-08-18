// --- Phần 1: Góc cảm hứng (Code cũ) ---
const quotes = [
  "\"Hành trình ngàn dặm bắt đầu từ một bước chân.\" - Lão Tử",
  "\"Cách tốt nhất để dự đoán tương lai là tự tạo ra nó.\" - Alan Kay",
  "\"Học tập là một việc làm suốt đời.\"",
  "\"Code không chỉ là logic, đó là nghệ thuật giải quyết vấn đề.\""
];

const quoteBtn = document.getElementById('quote-btn');
const quoteDisplay = document.getElementById('quote-display');

if (quoteBtn && quoteDisplay) {
  quoteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
  });
}

// --- Phần 2: Quản lý sinh viên (Thêm, Sửa, Xóa, Tìm kiếm) ---
let students = JSON.parse(localStorage.getItem('students')) || [
  { id: '233148201030', name: 'Nguyễn Văn Sơn', className: 'CNTT K24', gpa: '3.8' }
];

const studentForm = document.getElementById('student-form');
const studentIdInput = document.getElementById('student-id');
const studentNameInput = document.getElementById('student-name');
const studentClassInput = document.getElementById('student-class');
const studentGpaInput = document.getElementById('student-gpa');
const studentIndexInput = document.getElementById('student-index');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const studentList = document.getElementById('student-list');
const searchInput = document.getElementById('search-input');

// Hiển thị danh sách sinh viên
function renderStudents(data = students) {
  studentList.innerHTML = '';
  
  if (data.length === 0) {
    studentList.innerHTML = `<tr><td colspan="6" style="text-align:center;">Không tìm thấy sinh viên nào</td></tr>`;
    return;
  }

  data.forEach((student, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${student.id}</strong></td>
      <td>${student.name}</td>
      <td>${student.className}</td>
      <td><span style="color:#00dfd8; font-weight:bold;">${student.gpa}</span></td>
      <td>
        <button class="btn-edit" onclick="editStudent(${index})">Sửa</button>
        <button class="btn-delete" onclick="deleteStudent(${index})">Xóa</button>
      </td>
    `;
    studentList.appendChild(tr);
  });
}

// Lưu dữ liệu vào LocalStorage
function saveToLocalStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

// Thêm hoặc Cập nhật sinh viên
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const id = studentIdInput.value.trim();
  const name = studentNameInput.value.trim();
  const className = studentClassInput.value.trim();
  const gpa = studentGpaInput.value.trim();
  const editIndex = parseInt(studentIndexInput.value);

  if (editIndex === -1) {
    // Thêm mới
    students.push({ id, name, className, gpa });
  } else {
    // Cập nhật
    students[editIndex] = { id, name, className, gpa };
    studentIndexInput.value = '-1';
    btnSave.textContent = 'Thêm Sinh Viên';
    btnCancel.style.display = 'none';
  }

  saveToLocalStorage();
  renderStudents();
  studentForm.reset();
});

// Sửa sinh viên
window.editStudent = function(index) {
  const student = students[index];
  studentIdInput.value = student.id;
  studentNameInput.value = student.name;
  studentClassInput.value = student.className;
  studentGpaInput.value = student.gpa;
  studentIndexInput.value = index;

  btnSave.textContent = 'Cập Nhật';
  btnCancel.style.display = 'inline-block';
};

// Hủy chế độ sửa
btnCancel.addEventListener('click', () => {
  studentForm.reset();
  studentIndexInput.value = '-1';
  btnSave.textContent = 'Thêm Sinh Viên';
  btnCancel.style.display = 'none';
});

// Xóa sinh viên
window.deleteStudent = function(index) {
  if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderStudents();
  }
};

// Tìm kiếm sinh viên
searchInput.addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(keyword) || 
    s.id.toLowerCase().includes(keyword)
  );
  renderStudents(filtered);
});

// Lần đầu tải trang
renderStudents();