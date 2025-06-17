// Controle dos botões de ingresso
document.addEventListener('DOMContentLoaded', () => {
    const ingressoBtns = document.querySelectorAll('.ingresso-btn-modern');
    
    ingressoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove classe active de outros botões
            ingressoBtns.forEach(otherBtn => {
                if (otherBtn !== btn && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    // Reset da transformação
                    otherBtn.style.transform = '';
                }
            });
            
            // Toggle da classe active com animação
            if (!btn.classList.contains('active')) {
                btn.classList.add('active');
                
                // Efeito de ripple melhorado
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2.5;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Remove ripple anterior se existir
                const oldRipple = btn.querySelector('.ripple');
                if (oldRipple) {
                    oldRipple.remove();
                }
                
                btn.appendChild(ripple);
                
                // Remove o ripple após a animação
                setTimeout(() => {
                    ripple.remove();
                }, 750);
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Efeito de hover 3D suave
        btn.addEventListener('mousemove', (e) => {
            if (!btn.classList.contains('active')) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calcula a distância do mouse ao centro do botão
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX; // -1 to 1
                const deltaY = (y - centerY) / centerY; // -1 to 1
                
                // Aplica uma rotação 3D suave baseada na posição do mouse
                const rotation = 4; // Graus máximos de rotação
                const lift = 2; // Pixels de elevação
                
                btn.style.transform = `
                    perspective(1000px)
                    rotateX(${-deltaY * rotation}deg)
                    rotateY(${deltaX * rotation}deg)
                    translateY(-${lift}px)
                    scale(1.02)
                `;
            }
        });
        
        // Reset suave da transformação
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('active')) {
                btn.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0)
                    scale(1)
                `;
            }
        });
    });

    // Efeito de fumaça que segue o mouse
    const mainBg = document.querySelector('.main-bg');
    let isMouseMoving = false;
    let mouseTimeout;

    function updateMousePosition(e) {
        // Calcula a posição relativa do mouse
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        // Atualiza as variáveis CSS
        mainBg.style.setProperty('--mouse-x', `${x}%`);
        mainBg.style.setProperty('--mouse-y', `${y}%`);
        
        // Ativa o efeito
        if (!mainBg.classList.contains('active')) {
            mainBg.classList.add('active');
        }
        
        // Reset do timeout
        clearTimeout(mouseTimeout);
        
        // Define novo timeout para remover o efeito
        mouseTimeout = setTimeout(() => {
            mainBg.classList.remove('active');
        }, 150); // Ajuste este valor para controlar quanto tempo o efeito permanece após o mouse parar
    }

    // Adiciona o listener de movimento do mouse
    mainBg.addEventListener('mousemove', updateMousePosition);
    
    // Remove o efeito quando o mouse sai da área
    mainBg.addEventListener('mouseleave', () => {
        mainBg.classList.remove('active');
    });
});

// Função para criar partículas
function createParticles(e, btn) {
    const particles = btn.querySelector('.particles');
    particles.innerHTML = ''; // Limpa partículas anteriores
    
    // Número de partículas
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição inicial no ponto de clique
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Tamanho aleatório
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Direção aleatória
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--x', `${tx}px`);
        particle.style.setProperty('--y', `${ty}px`);
        
        // Aplica animação
        particle.style.animation = `particleAnimation 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        
        particles.appendChild(particle);
        
        // Remove a partícula após a animação
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const imageUpload = document.querySelector('.image-upload-modern');
  const imagePreview = document.querySelector('.image-preview-modern');
  const imageInput = document.querySelector('#event-image');
  const form = document.querySelector('form');
  const backgroundGradient = document.querySelector('.background-gradient');
  const ticketOptions = document.querySelectorAll('.ticket-type input[type="radio"]');

  // Efeito de brilho interativo do Windows Aero
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    
    backgroundGradient.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    backgroundGradient.classList.remove('active');
  });

  // Efeito de hover nos inputs
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-2px)';
      input.parentElement.style.boxShadow = '0 8px 25px rgba(200, 59, 27, 0.12)';
    });

    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'translateY(0)';
      input.parentElement.style.boxShadow = 'none';
    });
  });

  // Upload de imagem com preview
  if (imageUpload) {
    imageUpload.addEventListener('click', () => imageInput.click());

    imageUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageUpload.classList.add('dragover');
    });

    imageUpload.addEventListener('dragleave', () => {
      imageUpload.classList.remove('dragover');
    });

    imageUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      imageUpload.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    });

    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file);
      }
    });
  }

  function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `
        <img src="${e.target.result}" alt="Preview" class="preview-image">
        <button type="button" class="remove-image" aria-label="Remover imagem">
          <i class="fas fa-times"></i>
        </button>
      `;
      imageUpload.classList.add('has-image');
      
      // Adiciona efeito de brilho na imagem
      const previewImage = imagePreview.querySelector('.preview-image');
      previewImage.addEventListener('mousemove', (e) => {
        const rect = previewImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        previewImage.style.setProperty('--x', `${x}px`);
        previewImage.style.setProperty('--y', `${y}px`);
      });
    };
    reader.readAsDataURL(file);
  }

  // Remover imagem
  imagePreview.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-image') || e.target.closest('.remove-image')) {
      imagePreview.innerHTML = '';
      imageInput.value = '';
      imageUpload.classList.remove('has-image');
    }
  });

  // Validação do formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        
        // Adiciona efeito de shake no campo com erro
        field.style.animation = 'none';
        field.offsetHeight; // Força reflow
        field.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
      } else {
        field.classList.remove('error');
      }
    });

    if (isValid) {
      // Simula envio do formulário
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publicando...';

      setTimeout(() => {
        showNotification('Evento publicado com sucesso!', 'success');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Publicar Evento';
        form.reset();
        imagePreview.innerHTML = '';
        imageUpload.classList.remove('has-image');
      }, 2000);
    } else {
      showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
    }
  });

  // Sistema de notificações
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Adiciona efeito de entrada
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Validação de CEP
  const cepInput = document.querySelector('#cep');
  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);
      e.target.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    });

    cepInput.addEventListener('blur', async () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          
          if (!data.erro) {
            document.querySelector('#endereco').value = data.logradouro;
            document.querySelector('#bairro').value = data.bairro;
            document.querySelector('#cidade').value = data.localidade;
            document.querySelector('#estado').value = data.uf;
            
            // Adiciona efeito de sucesso
            const fields = document.querySelectorAll('#endereco, #bairro, #cidade, #estado');
            fields.forEach(field => {
              field.style.animation = 'none';
              field.offsetHeight;
              field.style.animation = 'successPulse 0.5s ease-out';
            });
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error);
        }
      }
    });
  }

  // Adiciona estilos para as notificações e animações
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    @keyframes successPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }

    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transform: translateX(120%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
    }

    .notification.show {
      transform: translateX(0);
    }

    .notification.success {
      border-left: 4px solid #22c55e;
    }

    .notification.error {
      border-left: 4px solid #ef4444;
    }

    .notification i {
      font-size: 1.25rem;
    }

    .notification.success i {
      color: #22c55e;
    }

    .notification.error i {
      color: #ef4444;
    }

    .preview-image {
      position: relative;
      overflow: hidden;
    }

    .preview-image::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle 100px at var(--x, 50%) var(--y, 50%),
        rgba(255, 255, 255, 0.2),
        transparent 80%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .preview-image:hover::after {
      opacity: 1;
    }

    .dragover {
      border-color: var(--primary-color) !important;
      background: rgba(200, 59, 27, 0.05) !important;
      transform: scale(1.02);
    }

    .error {
      border-color: var(--error-color) !important;
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    .has-image {
      padding: 0;
      border: none;
    }

    .has-image .image-placeholder-modern {
      display: none;
    }

    .preview-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 12px;
    }

    .remove-image {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .remove-image:hover {
      background: var(--error-color);
      color: white;
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);
}); 