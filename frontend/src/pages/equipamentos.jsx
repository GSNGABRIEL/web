import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    const carregarEquipamentos = async () => {
        try {
            const response = await equipamentoService.listar();
            setEquipamentos(response.data);
        } catch (error) {
            console.error("Erro ao buscar equipamentos", error);
        }
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (!nome || !setor) return alert("Preencha todos os campos obrigatórios!");

        try {
            if (editId) {
                await equipamentoService.atualizar(editId, { nome, setor });
                setEditId(null);
            } else {
                await equipamentoService.criar({ nome, setor });
            }
            setNome('');
            setSetor('');
            carregarEquipamentos();
        } catch (error) {
            console.error("Erro ao salvar equipamento", error);
            alert("Erro ao realizar operação.");
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Deseja realmente excluir este equipamento?")) return;
        try {
            await equipamentoService.excluir(id);
            if (editId === id) {
                cancelarEdicao();
            }
            carregarEquipamentos();
        } catch (error) {
            console.error("Erro ao deletar equipamento", error);
            alert("Erro ao excluir registro.");
        }
    };

    const iniciarEdicao = (equipamento) => {
        setEditId(equipamento.id);
        setNome(equipamento.nome);
        setSetor(equipamento.setor);
    };

    const cancelarEdicao = () => {
        setEditId(null);
        setNome('');
        setSetor('');
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Gestão de Equipamentos</h2>
            
            <form onSubmit={salvar} className="form-card">
                <h3 className="form-title">
                    {editId ? "Editar Equipamento" : "Novo Equipamento"}
                </h3>
                <div className="form-row" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label className="input-label">Equipamento</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Escavadeira CAT 320" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Setor de Atuação</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Extracao" 
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)} 
                            required
                        />
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

            <h3 className="section-subtitle">Equipamentos Cadastrados</h3>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>#</th>
                            <th>Equipamento</th>
                            <th>Setor</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipamentos.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Nenhum equipamento cadastrado.
                                </td>
                            </tr>
                        ) : (
                            equipamentos.map((eq, index) => (
                                <tr key={eq.id}>
                                    <td>{index + 1}</td>
                                    <td>{eq.nome}</td>
                                    <td>
                                        <span className="badge badge-warning">{eq.setor}</span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-edit" 
                                            onClick={() => iniciarEdicao(eq)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-delete" 
                                            onClick={() => deletar(eq.id)}
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