// PROJETOS MODAL
const projectsData = {
    1: {
        title: "- - - - - - - - - - - - - - - - - - -",
        description: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
        technologies: ["- - - - -", "- - - - -", "- - - - -", "- - - - -", "- - - - -"],
        icon: "shield",
        githubUrl: "",
        liveUrl: ""
    },
    2: {
        title: "- - - - - - - - - - - - - - - - - - -",
        description: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
        technologies: ["- - - - -", "- - - - -", "- - - - -", "- - - - -"],
        icon: "globe",
        githubUrl: ""
    },
    3: {
        title: "- - - - - - - - - - - - - - - - - - -",
        description: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
        technologies: ["- - - - -", "- - - - -", "- - - - -", "- - - - -"],
        icon: "database",
        githubUrl: "",
        liveUrl: ""
    }
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', function() {
    // INICIALIZAÇÃO ÍCONES
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // MODO ESCURO/CLARO
    initThemeToggle();
    
    // MOBILE
    initMobileMenu();
    
    // FORMULÁRIO
    initContactForm();
    
    // MODAL
    initModal();
    
    // APLICAR TEMA SALVO
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        const isDark = JSON.parse(savedTheme);
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        updateThemeIcon();
    }
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', JSON.stringify(isDark));
        updateThemeIcon();
    });
}

// ÍCONE DO TEMA
function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    const isDark = document.body.classList.contains('dark');
    
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// MENU MOBILE
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileNav.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    
    mobileNav.classList.add('active');
    menuIcon.setAttribute('data-lucide', 'x');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.querySelector('.mobile-menu-icon');
    
    mobileNav.classList.remove('active');
    menuIcon.setAttribute('data-lucide', 'menu');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// FORMULÁRIO
function initContactForm() {
    const form = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    
    // MÁSCARA TELEFONE
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        e.target.value = value;
    });
    
    // VALIDAÇÃO
    const inputs = ['name', 'phone', 'email', 'message'];
    inputs.forEach(inputName => {
        const input = document.getElementById(inputName);
        input.addEventListener('input', function() {
            clearError(inputName);
        });
    });
    
    // ENVIO
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessMessage();
        }
    });
}

// VALIDAÇÃO
function validateForm() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    let isValid = true;
    
    // NOME
    if (!formData.name) {
        showError('name', 'Nome é obrigatório');
        isValid = false;
    } else if (formData.name.length < 2) {
        showError('name', 'Nome deve ter pelo menos 2 caracteres');
        isValid = false;
    }
    
    // TELEFONE
    if (!formData.phone) {
        showError('phone', 'Telefone é obrigatório');
        isValid = false;
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
        showError('phone', 'Telefone deve ter pelo menos 10 dígitos');
        isValid = false;
    }
    
    // EMAIL
    if (!formData.email) {
        showError('email', 'Email é obrigatório');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        showError('email', 'Email deve ter um formato válido');
        isValid = false;
    }
    
    // MENSAGEM
    if (!formData.message) {
        showError('message', 'Mensagem é obrigatória');
        isValid = false;
    } else if (formData.message.length < 10) {
        showError('message', 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// ERRO VALIDAÇÃO
function showError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    
    input.classList.add('error');
    errorElement.textContent = message;
}

function clearError(fieldName) {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + '-error');
    
    input.classList.remove('error');
    errorElement.textContent = '';
}

// MENSAGEM SUCESSO
function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // ÍCONES
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // RESET FORMULÁRIO
    setTimeout(function() {
        form.style.display = 'flex';
        successMessage.style.display = 'none';
        form.reset();
    }, 5000);
}

// MODAL
function initModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    
    modalClose.addEventListener('click', closeModal);
}

// CONFIGURAR MODAL
function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const modalLinks = document.getElementById('modal-links');
    
    modalIcon.setAttribute('data-lucide', project.icon);
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const techSpan = document.createElement('span');
        techSpan.className = 'tech-tag';
        techSpan.textContent = tech;
        modalTech.appendChild(techSpan);
    });
    
    modalLinks.innerHTML = '';
    
    const githubLink = document.createElement('a');
    githubLink.href = project.githubUrl;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'btn-secondary';
    githubLink.innerHTML = '<i data-lucide="github"></i> Ver Código';
    modalLinks.appendChild(githubLink);
    
    if (project.liveUrl) {
        const liveLink = document.createElement('a');
        liveLink.href = project.liveUrl;
        liveLink.target = '_blank';
        liveLink.rel = 'noopener noreferrer';
        liveLink.className = 'btn-primary';
        liveLink.innerHTML = '<i data-lucide="external-link"></i> Ver Demo';
        modalLinks.appendChild(liveLink);
    }
    
    // MOSTRAR MODAL
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // ÍCONES
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// FECHAR MODAL
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function stopPropagation(event) {
    event.stopPropagation();
}