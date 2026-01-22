const fases = {
  facil: [
    { p: 'HTML', d: 'Linguagem de marcação' },
    { p: 'CSS', d: 'Estilo visual' }
  ],
  medio: [
    { p: 'JAVASCRIPT', d: 'Linguagem da web' }
  ],
  dificil: [
    { p: 'ALGORITMOS', d: 'Base da programação' }
  ]
};

let nivel = 'facil';
let indice = 0;
let palavra = '';
let dica = '';
let erros = 0;
let pontos = 0;

const max = 6;

const partes = document.querySelectorAll('.parte');
const palavraEl = document.getElementById('palavra');
const teclado = document.getElementById('teclado');
const dicaEl = document.getElementById('dica');
const status = document.getElementById('status');
const nivelEl = document.getElementById('nivel');
const vidasEl = document.getElementById('vidas');
const scoreEl = document.getElementById('score');

function iniciar() {
  const lista = fases[nivel];

  // Verifica se acabou o nível
  if (indice >= lista.length) {
    if (nivel === 'facil') nivel = 'medio';
    else if (nivel === 'medio') nivel = 'dificil';
    else {
      // Jogo finalizado
      status.textContent = '🏆 PARABÉNS, JOGO FINALIZADO';
      status.className = 'status win';
      palavraEl.innerHTML = '';
      teclado.innerHTML = '';
      dicaEl.textContent = '';
      vidasEl.textContent = '';
      nivelEl.textContent = '';
      return; // para o jogo
    }
    indice = 0;
  }

  const item = lista[indice];
  palavra = item.p;
  dica = item.d;
  erros = 0;

  palavraEl.innerHTML = '';
  teclado.innerHTML = '';
  status.textContent = '';
  dicaEl.textContent = '💡 Dica oculta';

  partes.forEach(p => p.classList.add('hidden'));

  nivelEl.textContent = nivel.toUpperCase();
  vidasEl.textContent = '❤️ ' + max;
  scoreEl.textContent = '⭐ ' + pontos;

  for (let l of palavra) {
    const span = document.createElement('div');
    span.className = 'letra';
    palavraEl.appendChild(span);
  }

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(l => {
    const btn = document.createElement('button');
    btn.textContent = l;
    btn.onclick = () => jogar(l, btn);
    teclado.appendChild(btn);
  });
}

function jogar(letra, btn) {
  btn.disabled = true;
  let acertou = false;

  palavra.split('').forEach((l, i) => {
    if (l === letra) {
      palavraEl.children[i].textContent = l;
      acertou = true;
    }
  });

  if (!acertou) {
    if (erros < max) partes[erros].classList.remove('hidden');
    erros++;
  }

  vidasEl.textContent = '❤️ ' + (max - erros);
  verificar();
}

function verificar() {
  if ([...palavraEl.children].every(l => l.textContent)) {
    pontos += 10;
    indice++;
    status.textContent = '🎉 Acertou!';
    status.className = 'status win';
    setTimeout(iniciar, 1000);
  } else if (erros === max) {
    status.textContent = '💀 ' + palavra;
    status.className = 'status lose';
    indice++;
    setTimeout(iniciar, 1200);
  }
}

document.getElementById('btnDica').onclick = () => {
  dicaEl.textContent = '💡 ' + dica;
};

document.getElementById('btnReset').onclick = () => {
  nivel = 'facil';
  indice = 0;
  pontos = 0;
  iniciar();
};

iniciar();
