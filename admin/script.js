const mouseIn = (self) => {
    self.style.backgroundColor = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? '#333' : '#f0f0f0';
}

const mouseOut = (self) => {
    self.style.backgroundColor = '';
}