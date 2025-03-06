// Variáveis globais
let projetos = {};
let projetoAtual = null;
let localizacaoAtual = null;

// Inicialização
window.onload = function() {
    console.log('Iniciando aplicativo...');
    
    // Carregar dados salvos
    try {
        const dadosSalvos = localStorage.getItem('projetos');
        if (dadosSalvos) {
            projetos = JSON.parse(dadosSalvos);
            console.log('Dados carregados:', projetos);
            atualizarListaProjetos();
        }
    } catch (e) {
        console.error('Erro ao carregar dados:', e);
        alert('Erro ao carregar dados salvos');
    }
};

// Funções de gerenciamento de projetos
function criarProjeto() {
    console.log('Tentando criar projeto...');
    const nomeProjeto = document.getElementById('novoProjeto').value.trim();
    
    if (!nomeProjeto) {
        alert('Por favor, insira um nome para o projeto');
        return;
    }

    if (projetos[nomeProjeto]) {
        alert('Já existe um projeto com este nome');
        return;
    }

    projetos[nomeProjeto] = {
        dados: []
    };

    try {
        localStorage.setItem('projetos', JSON.stringify(projetos));
        console.log('Projeto criado:', nomeProjeto);
        document.getElementById('novoProjeto').value = '';
        atualizarListaProjetos();
        
        // Selecionar o projeto recém-criado
        document.getElementById('projetoAtual').value = nomeProjeto;
        projetoAtual = nomeProjeto;
        
        alert('Projeto criado com sucesso!');
    } catch (e) {
        console.error('Erro ao criar projeto:', e);
        alert('Erro ao criar projeto. Tente novamente.');
    }
}

function atualizarListaProjetos() {
    console.log('Atualizando lista de projetos...');
    const select = document.getElementById('projetoAtual');
    select.innerHTML = '<option value="">Selecione um projeto</option>';
    
    for (const nome in projetos) {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    }
}

function carregarProjeto() {
    console.log('Carregando projeto...');
    const select = document.getElementById('projetoAtual');
    projetoAtual = select.value;
    
    if (projetoAtual) {
        exibirDados();
    } else {
        document.getElementById('listaDados').innerHTML = '';
    }
}

function capturarLocalizacao() {
    console.log('Iniciando captura de localização...');
    
    if (!navigator.geolocation) {
        alert('Geolocalização não é suportada pelo seu navegador');
        return;
    }

    const btn = document.querySelector('button.btn-success');
    btn.disabled = true;
    btn.textContent = 'Capturando...';

    navigator.geolocation.getCurrentPosition(
        function(position) {
            localizacaoAtual = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: new Date().toISOString()
            };
            console.log('Localização capturada:', localizacaoAtual);
            alert('Localização capturada com sucesso!');
            
            btn.disabled = false;
            btn.textContent = 'Capturar Localização';
        },
        function(error) {
            console.error('Erro na geolocalização:', error);
            alert('Erro ao capturar localização: ' + error.message);
            
            btn.disabled = false;
            btn.textContent = 'Capturar Localização';
        }
    );
}

function salvarDados() {
    console.log('Tentando salvar dados...');
    
    if (!projetoAtual) {
        alert('Por favor, selecione um projeto primeiro');
        return;
    }

    if (!localizacaoAtual) {
        alert('Por favor, capture a localização primeiro');
        return;
    }

    const observacao = document.getElementById('observacao').value.trim();
    if (!observacao) {
        alert('Por favor, insira uma observação');
        return;
    }

    try {
        const novoDado = {
            ...localizacaoAtual,
            observacao: observacao
        };

        projetos[projetoAtual].dados.push(novoDado);
        localStorage.setItem('projetos', JSON.stringify(projetos));
        
        document.getElementById('observacao').value = '';
        localizacaoAtual = null;
        exibirDados();
        
        alert('Dados salvos com sucesso!');
    } catch (e) {
        console.error('Erro ao salvar dados:', e);
        alert('Erro ao salvar dados. Tente novamente.');
    }
}

function exibirDados() {
    console.log('Exibindo dados...');
    if (!projetoAtual) return;

    const listaDados = document.getElementById('listaDados');
    listaDados.innerHTML = '';

    const dados = projetos[projetoAtual].dados;
    for (let i = 0; i < dados.length; i++) {
        const dado = dados[i];
        const div = document.createElement('div');
        div.className = 'dado-item';
        div.innerHTML = `
            <div class="coordenadas">
                Latitude: ${dado.latitude.toFixed(6)} | Longitude: ${dado.longitude.toFixed(6)}
            </div>
            <div class="observacao">${dado.observacao}</div>
            <small style="color: #666;">${new Date(dado.timestamp).toLocaleString()}</small>
        `;
        listaDados.appendChild(div);
    }
}

function exportarExcel() {
    console.log('Iniciando exportação...');
    
    if (!projetoAtual) {
        alert('Por favor, selecione um projeto primeiro');
        return;
    }

    const dados = projetos[projetoAtual].dados;
    if (dados.length === 0) {
        alert('Não há dados para exportar');
        return;
    }

    try {
        // Criar conteúdo CSV
        let csv = 'Data/Hora,Latitude,Longitude,Observação\n';
        dados.forEach(dado => {
            csv += `${new Date(dado.timestamp).toLocaleString()},${dado.latitude},${dado.longitude},"${dado.observacao}"\n`;
        });

        // Criar blob e download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${projetoAtual}_dados_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        alert('Dados exportados com sucesso!');
    } catch (e) {
        console.error('Erro ao exportar dados:', e);
        alert('Erro ao exportar dados. Tente novamente.');
    }
} 