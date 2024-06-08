// Função para validar o cadastro do usuário
function validarCadastro() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var confirmaSenha = document.getElementById('confirmaSenha').value;
    var cpf = document.getElementById('cpf').value;
    var telefone = document.getElementById('telefone').value;
    var cep = document.getElementById('cep').value;
    var cidade = document.getElementById('cidade').value;
    var estado = document.getElementById('estado').value;

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    var regexTelefone = /^\(\d{2}\)\d{5}-\d{4}$/;
    var regexCep = /^\d{5}-\d{3}$/;

    var valido = true;

    // Validação do campo nome
    if (nome.trim() === '') {
        document.getElementById('erroNome').innerText = 'Por favor, preencha este campo.';
        valido = false;
    } else {
        document.getElementById('erroNome').innerText = '';
    }

    // Validação do campo email
    if (!regexEmail.test(email)) {
        document.getElementById('erroEmail').innerText = 'Por favor, insira um email válido.';
        valido = false;
    } else {
        document.getElementById('erroEmail').innerText = '';
    }

    // Validação do campo senha
    if (senha.trim() === '') {
        document.getElementById('erroSenha').innerText = 'Por favor, preencha este campo.';
        valido = false;
    } else {
        document.getElementById('erroSenha').innerText = '';
    }

    // Validação do campo confirmaSenha
    if (confirmaSenha.trim() === '') {
        document.getElementById('erroConfirmaSenha').innerText = 'Por favor, preencha este campo.';
        valido = false;
    } else if (senha !== confirmaSenha) {
        document.getElementById('erroConfirmaSenha').innerText = 'As senhas não coincidem.';
        valido = false;
    } else {
        document.getElementById('erroConfirmaSenha').innerText = '';
    }

    // Validação do campo CPF
    if (!regexCpf.test(cpf)) {
        document.getElementById('erroCpf').innerText = 'Por favor, insira um CPF válido (###.###.###-##).';
        valido = false;
    } else {
        document.getElementById('erroCpf').innerText = '';
    }

    // Validação do campo telefone
    if (!regexTelefone.test(telefone)) {
        document.getElementById('erroTelefone').innerText = 'Por favor, insira um telefone válido ((##)#####-####).';
        valido = false;
    } else {
        document.getElementById('erroTelefone').innerText = '';
    }

    // Validação do campo CEP
    if (!regexCep.test(cep)) {
        document.getElementById('erroCep').innerText = 'Por favor, insira um CEP válido (#####-###).';
        valido = false;
    } else {
        document.getElementById('erroCep').innerText = '';
    }

    // Validação do campo cidade
    if (cidade.trim() === '') {
        document.getElementById('erroCidade').innerText = 'Por favor, preencha este campo.';
        valido = false;
    } else {
        document.getElementById('erroCidade').innerText = '';
    }

    // Validação do campo estado
    if (estado.trim() === '') {
        document.getElementById('erroEstado').innerText = 'Por favor, preencha este campo.';
        valido = false;
    } else {
        document.getElementById('erroEstado').innerText = '';
    }

    if (valido) {
        // Recupera os dados dos usuários existentes ou inicializa uma lista vazia
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verifica se já existe um usuário com o mesmo email
        var usuarioExistente = usuarios.find(function(usuario) {
            return usuario.email === email;
        });

        if (!usuarioExistente) {
            // Adiciona o novo usuário à lista de usuários
            var novoUsuario = {
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                telefone: telefone,
                cep: cep,
                cidade: cidade,
                estado: estado,
                pontuacao: 0 // Define a pontuação inicial como 0
            };

            usuarios.push(novoUsuario);

            // Salva a lista atualizada de usuários no armazenamento local
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Exibir mensagem de sucesso
            var mensagemSucesso = document.getElementById('mensagemSucesso');
            mensagemSucesso.innerText = 'Cadastro realizado com sucesso!';
            mensagemSucesso.style.display = 'block';

            // Redirecionar para a página de login após um atraso
            setTimeout(function() {
                window.location.href = './login.html';
            }, 3000);
        } else {
            // Exibir mensagem de erro se o usuário já existir
            document.getElementById('erroEmail').innerText = 'Este email já está sendo usado por outro usuário.';
        }
    }
    return false; // Evita o envio do formulário se houver campos inválidos
}


// Função para validar o login do usuário
document.getElementById('btnLogin').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Recupera os dados dos usuários armazenados localmente
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Procura pelo usuário com o email e senha fornecidos
    var usuario = usuarios.find(function(usuario) {
        return usuario.email === email && usuario.senha === senha;
    });

    if (usuario) {
        // Login bem-sucedido, exibe mensagem de sucesso e redireciona após 2 segundos
        var mensagemSucessoLogin = document.getElementById('mensagemSucessoLogin');
        mensagemSucessoLogin.innerText = 'Login realizado com sucesso!';
        mensagemSucessoLogin.style.display = 'block';

        // Atualiza a pontuação do usuário
        var pontuacaoAtual = getPontuacaoUsuario(usuario);
        atualizarPontuacaoUsuario(pontuacaoAtual);

        // Salva os usuários atualizados no armazenamento local
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Armazena o usuário logado localmente
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // Redireciona para a página de sucesso após o login
        setTimeout(function() {
            window.location.href = './login-sucesso.html';
        }, 2000);
    } else {
        // Exibe mensagem de erro de login
        var erroLogin = document.getElementById('erroLogin');
        erroLogin.innerText = 'Email ou senha incorretos.';

        // Limpa a mensagem de erro após 2 segundos
        setTimeout(function() {
            erroLogin.innerText = '';
        }, 3000);
    }
});

// Modal Servicos

function abrirModal(idModal) {
    document.getElementById(idModal).style.display = "flex";
}

function fecharModal(idModal) {
    document.getElementById(idModal).style.display = "none";
}

