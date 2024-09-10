// Variáveis para as raquetes, bola e barras horizontais
let raqueteJogador, raqueteComputador, bola, barraSuperior, barraInferior;
let fundoImg, bolaImg, barra1Img, barra2Img;
let bounceSound, golSound;

let placarJogador = 0;
let placarComputador = 0;

let jogoAcabou = false;
let botaoSim, botaoNao;
let vencedor = ''; // Armazena quem foi o vencedor (jogador ou computador)

function preload() {
  fundoImg = loadImage('fundo1.png');
  bolaImg = loadImage('bola.png');
  barra1Img = loadImage('barra01.png');
  barra2Img = loadImage('barra02.png');
  bounceSound = loadSound('7e491846-a289-4840-bde5-032ea61a7786.wav');
  golSound = loadSound('32da8b6e-779f-4d43-b4db-697242c705b6.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    raqueteJogador = new Raquete(30, height / 2, 10, 60);
    raqueteComputador = new Raquete(width - 40, height / 2, 10, 60);
    bola = new Bola(10);
    barraSuperior = new Barra(0, 0, width, 5);
    barraInferior = new Barra(0, height - 5, width, 5);
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    barraSuperior.w = width;
    barraInferior.w = width;
    barraInferior.y = height - 5;
    raqueteJogador.y = constrain(raqueteJogador.y, raqueteJogador.h / 2 + barraSuperior.h, height - raqueteJogador.h / 2 - barraInferior.h);
    raqueteComputador.y = constrain(raqueteComputador.y, raqueteComputador.h / 2 + barraSuperior.h, height - raqueteComputador.h / 2 - barraInferior.h);
  }
  
function draw() {
  if (!jogoAcabou) {
    let escala = Math.max(width / fundoImg.width, height / fundoImg.height);
    let imgWidth = fundoImg.width * escala;
    let imgHeight = fundoImg.height * escala;
    let imgX = (width - imgWidth) / 2;
    let imgY = (height - imgHeight) / 2;
    image(fundoImg, imgX, imgY, imgWidth, imgHeight);

    // Atualiza as posições das raquetes, bola e barras horizontais
    raqueteJogador.atualizar();
    raqueteComputador.atualizar();
    bola.atualizar(barraSuperior, barraInferior);

    // Verifica colisões entre bola e raquetes
    bola.verificarColisaoRaquete(raqueteJogador);
    bola.verificarColisaoRaquete(raqueteComputador);

    // Desenha as raquetes, a bola e as barras horizontais
    raqueteJogador.exibir();
    raqueteComputador.exibir();
    bola.exibir();
    barraSuperior.exibir();
    barraInferior.exibir();

    // Mostrar painel de pontuação
    mostrarPainelPontuacao();

    // Verifica se alguém atingiu 5 pontos
    verificarFimDeJogo();
  }
}

// Função para mostrar o painel de pontuação
function mostrarPainelPontuacao() {
  textAlign(CENTER, CENTER);
  textSize(32);

  // Cor de fundo do painel
  fill(0);
  rectMode(CENTER);
  rect(width / 2, 40, 200, 50, 10);  // Painel preto arredondado

  // Pontuação do jogador (lado direito, vermelho)
  fill(255, 0, 0);
  text(placarJogador, width / 2 + 50, 40);

  // Pontuação do computador (lado esquerdo, azul)
  fill(0, 0, 255);
  text(placarComputador, width / 2 - 50, 40);
}

// Função para verificar se o jogo acabou
function verificarFimDeJogo() {
  if (placarJogador >= 5 || placarComputador >= 5) {
    jogoAcabou = true;
    vencedor = placarJogador >= 5 ? 'jogador' : 'computador';
    mostrarMensagemDeFimDeJogo();
  }
}

// Função para mostrar a mensagem de fim de jogo com botões "Sim" e "Não"
function mostrarMensagemDeFimDeJogo() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);

  text("Deseja jogar novamente?", width / 2, height / 2);

  // Criar botões "Sim" e "Não" se não existirem
  if (!botaoSim && !botaoNao) {
    botaoSim = createButton('Sim');
    botaoSim.position(width / 2 - 50, height / 2 + 50);
    botaoSim.mousePressed(reiniciarJogo);

    botaoNao = createButton('Não');
    botaoNao.position(width / 2 + 50, height / 2 + 50);
    botaoNao.mousePressed(fimDeJogo);
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  placarJogador = 0;
  placarComputador = 0;
  jogoAcabou = false;
  vencedor = ''; // Resetar o vencedor

  // Remover os botões
  if (botaoSim) botaoSim.remove();
  if (botaoNao) botaoNao.remove();

  botaoSim = null;
  botaoNao = null;
}

// Função para encerrar o jogo e mostrar a mensagem de agradecimento
function mostrarMensagemDeFimDeJogo() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);

  // Verifica quem venceu e mostra a mensagem apropriada
  if (vencedor === 'computador') {
    text("Parabéns, você ganhou!", width / 2, height / 2 - 50);
  } else {
    text("Você perdeu!", width / 2, height / 2 - 50);
  }

  // Pergunta se deseja jogar novamente
  text("Deseja jogar novamente?", width / 2, height / 2);

  // Criar botões "Sim" e "Não" se não existirem
  if (!botaoSim && !botaoNao) {
    botaoSim = createButton('Sim');
    botaoSim.position(width / 2 - 50, height / 2 + 50);
    botaoSim.mousePressed(reiniciarJogo);

    botaoNao = createButton('Não');
    botaoNao.position(width / 2 + 50, height / 2 + 50);
    botaoNao.mousePressed(fimDeJogo);
  }
}
function fimDeJogo() {
  // Limpa a tela e exibe apenas "Obrigado por jogar!"
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Obrigado por jogar!", width / 2, height / 2);

  // Remover os botões
  if (botaoSim) botaoSim.remove();
  if (botaoNao) botaoNao.remove();

  botaoSim = null;
  botaoNao = null;
}

// Classe Raquete
class Raquete {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  atualizar() {
    if (this === raqueteJogador) {
      this.y = mouseY;
    } else {
      if (bola.y > this.y + this.h / 2) {
        this.y += 3;
      } else if (bola.y < this.y - this.h / 2) {
        this.y -= 3;
      }
    }
    this.y = constrain(this.y, this.h / 2 + barraSuperior.h, height - this.h / 2 - barraInferior.h);
  }

  exibir() {
    let img = (this === raqueteJogador) ? barra1Img : barra2Img;
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(this.h / 400.0); // Escala as imagens para metade do tamanho
    image(img, 0, 0, img.width, img.height);
    pop();
  }
}

// Classe Bola
class Bola {
  constructor(r) {
    this.r = r;
    this.reiniciar();
  }

  reiniciar() {
    this.anguloRotacao = 0;
    this.x = width / 2;
    this.y = height / 2;
    this.velocidadeX = random([-4, -3, 3, 4]);
    this.velocidadeY = random(-3, 3);
  }

  atualizar(barraSuperior, barraInferior) {
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;

    if (
      this.y - this.r / 2 <= barraSuperior.y + barraSuperior.h ||
      this.y + this.r / 2 >= barraInferior.y - barraInferior.h
    ) {
      this.velocidadeY *= -1;
    }

    if (this.x + this.r / 2 >= width) {
      this.reiniciar();
      tocarSomDeGol();
      placarComputador++;
    } else if (this.x - this.r / 2 <= 0) {
      raqueteComputador.y = random(height - raqueteComputador.h);
      this.reiniciar();
      tocarSomDeGol();
      placarJogador++;
    }

    this.anguloRotacao += Math.atan2(this.velocidadeY, this.velocidadeX) / 5;
  }

  verificarColisaoRaquete(raquete) {
    // Verifica se a bola colidiu com a raquete
    if (
      this.x - this.r / 2 < raquete.x + raquete.w / 2 &&
      this.x + this.r / 2 > raquete.x - raquete.w / 2 &&
      this.y - this.r / 2 < raquete.y + raquete.h / 2 &&
      this.y + this.r / 2 > raquete.y - raquete.h / 2
    ) {
      // Corrigir a posição da bola para fora da raquete
      if (this.velocidadeX < 0) {
        this.x = raquete.x + raquete.w / 2 + this.r / 2;
      } else {
        this.x = raquete.x - raquete.w / 2 - this.r / 2;
      }

      // Inverter a direção horizontal da bola
      this.velocidadeX *= -1.05;
      this.velocidadeY = (this.y - raquete.y) / 5;

      tocarSomDeBounce();
    }
  }

  exibir() {
    push();
    translate(this.x, this.y);
    rotate(this.anguloRotacao);
    imageMode(CENTER);
    image(bolaImg, 0, 0, 20, 20);
    pop();
  }
}

// Classe Barra
class Barra {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  exibir() {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

// Funções para tocar sons
function tocarSomDeBounce() {
  if (bounceSound.isPlaying()) {
    bounceSound.stop();
  }
  bounceSound.play();
}

function tocarSomDeGol() {
  if (golSound.isPlaying()) {
    golSound.stop();
  }
  golSound.play();
}
