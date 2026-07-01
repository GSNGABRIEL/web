import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [editId, setEditId] = useState(null);

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

    const salvar = async (e) => {
        e.preventDefault();
        if (!descricao || !tipo || !status) return alert("Preencha todos os campos obrigatórios!");

        try {
            if (editId) {
                await servicoService.atualizar(editId, { descricao, tipo, status });
                setEditId(null);
            } else {
                await servicoService.criar({ descricao, tipo, status });
            }
            setDescricao('');
            setTipo('');
            setStatus('Pendente');
            carregarServicos();
        } catch (error) {
            console.error("Erro ao salvar serviço", error);
            alert("Erro ao realizar operação.");
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Deseja realmente excluir este serviço?")) return;
        try {
            await servicoService.excluir(id);
            if (editId === id) {
                cancelarEdicao();
            }
            carregarServicos();
        } catch (error) {
            console.error("Erro ao deletar serviço", error);
            alert("Erro ao excluir registro.");
        }
    };

    const iniciarEdicao = (servico) => {
        setEditId(servico.id);
        setDescricao(servico.descricao);
        setTipo(servico.tipo);
        setStatus(servico.status);
    };

    const cancelarEdicao = () => {
        setEditId(null);
        setDescricao('');
        setTipo('');
        setStatus('Pendente');
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Concluído': return 'badge-success';
            case 'Em andamento': return 'badge-info';
            case 'Pendente':
            default: return 'badge-warning';
        }
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Gestão de Serviços</h2>
            
            <form onSubmit={salvar} className="form-card">
                <h3 className="form-title">
                    {editId ? "Editar Serviço" : "Novo Serviço"}
                </h3>
                <div className="form-row" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group" style={{ flex: '2', minWidth: '250px' }}>
                        <label className="input-label">Descrição do Serviço</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Manutencao Preventiva" 
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Tipo de Serviço</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Mecanica" 
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Status</label>
                        <select 
                            className="input-control"
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ flex: '0 0 auto' }}>
                        <div className="btn-group">
                            <button type="submit" className="btn">
                                {editId ? "Salvar" : "Cadastrar"}
                            </button>
                            {editId && (
                                <button type="button" className="btn btn-secondary" onClick={cancelarEdicao}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <h3 className="section-subtitle">Serviços Cadastrados</h3>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>#</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th style={{ width: '150px' }}>Status</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Nenhum serviço cadastrado.
                                </td>
                            </tr>
                        ) : (
                            servicos.map((serv, index) => (
                                <tr key={serv.id}>
                                    <td>{index + 1}</td>
                                    <td>{serv.descricao}</td>
                                    <td>{serv.tipo}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(serv.status)}`}>
                                            {serv.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-edit" 
                                            onClick={() => iniciarEdicao(serv)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-delete" 
                                            onClick={() => deletar(serv.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
