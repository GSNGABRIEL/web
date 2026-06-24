import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('Pendente');

    useEffect(() => {
        carregarServicos();
    }, []);

    const carregarServicos = async () => {
        try {
            const response = await servicoService.listar();
            setServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços", error);
        }
    };

    const cadastrar = async () => {
        if (!descricao || !tipo || !status) return alert("Preencha todos os campos!");
        try {
            await servicoService.criar({ descricao, tipo, status });
            setDescricao('');
            setTipo('');
            setStatus('Pendente');
            carregarServicos(); // Atualiza a lista após cadastrar
        } catch (error) {
            console.error("Erro ao cadastrar", error);
        }
    };

    return (
        <div>
            <h2>Gestão de Serviços</h2>
            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Novo Serviço</h3>
                <input type="text" placeholder="Descrição do Serviço" value={descricao}
                    onChange={(e) => setDescricao(e.target.value)} style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Tipo (Ex: Preventiva)" value={tipo}
                    onChange={(e) => setTipo(e.target.value)} style={{ marginRight: '10px' }} />
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginRight: '10px', padding: '4px' }}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                </select>
                <button onClick={cadastrar}>Cadastrar</button>
            </div>
            <h3>Serviços Cadastrados</h3>
            <ul>
                {servicos.map(serv => (
                    <li key={serv.id}><strong>{serv.descricao}</strong> - Tipo: {serv.tipo} | Status: {serv.status}</li>
                ))}
            </ul>
        </div>
    );
}
