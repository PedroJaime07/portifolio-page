const botoesTopo = document.querySelectorAll(".btn-topo");

function atualizarBotaoTopo() {
  const mostrar = window.scrollY > 300;
  botoesTopo.forEach((btn) => {
    btn.classList.toggle("visivel", mostrar);
  });
}

window.addEventListener("scroll", atualizarBotaoTopo);
atualizarBotaoTopo();

botoesTopo.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const elementosRevelar = document.querySelectorAll(
  ".descricao > div, .foto-perfil, .formulario",
);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elementosRevelar.forEach((el) => {
    el.classList.add("revelar");
    observador.observe(el);
  });
}

const form = document.querySelector(".form-contato");

if (form) {
  const campoNome = document.getElementById("nome");
  const campoEmail = document.getElementById("email");
  const campoMensagem = document.getElementById("mensagem");

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function mostrarErro(campo, idErro, mensagem) {
    document.getElementById(idErro).textContent = mensagem;
    campo.classList.add("invalido");
  }

  function limparErro(campo, idErro) {
    document.getElementById(idErro).textContent = "";
    campo.classList.remove("invalido");
  }

  function validarFormulario() {
    let valido = true;

    if (campoNome.value.trim().length < 3) {
      mostrarErro(
        campoNome,
        "erro-nome",
        "Informe um nome com pelo menos 3 letras.",
      );
      valido = false;
    } else {
      limparErro(campoNome, "erro-nome");
    }

    if (!regexEmail.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, "erro-email", "Informe um e-mail válido.");
      valido = false;
    } else {
      limparErro(campoEmail, "erro-email");
    }

    if (campoMensagem.value.trim().length < 10) {
      mostrarErro(
        campoMensagem,
        "erro-mensagem",
        "A mensagem deve ter pelo menos 10 caracteres.",
      );
      valido = false;
    } else {
      limparErro(campoMensagem, "erro-mensagem");
    }

    return valido;
  }

  [campoNome, campoEmail, campoMensagem].forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.classList.remove("invalido");
      document.getElementById("erro-" + campo.id).textContent = "";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    alert("Mensagem enviada com sucesso!");
    form.reset();
  });
}
