import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const response = await funcionarioService.listar();
            setFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar funcionários", error);
        }
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (!nome || !cargo) return alert("Preencha todos os campos obrigatórios!");

        try {
            if (editId) {
                await funcionarioService.atualizar(editId, { nome, cargo });
                setEditId(null);
            } else {
                await funcionarioService.criar({ nome, cargo });
            }
            setNome('');
            setCargo('');
            carregarFuncionarios();
        } catch (error) {
            console.error("Erro ao salvar funcionário", error);
            alert("Erro ao realizar operação.");
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Deseja realmente excluir este funcionário?")) return;
        try {
            await funcionarioService.excluir(id);
            if (editId === id) {
                cancelarEdicao();
            }
            carregarFuncionarios();
        } catch (error) {
            console.error("Erro ao deletar funcionário", error);
            alert("Erro ao excluir registro.");
        }
    };

    const iniciarEdicao = (funcionario) => {
        setEditId(funcionario.id);
        setNome(funcionario.nome);
        setCargo(funcionario.cargo);
    };

    const cancelarEdicao = () => {
        setEditId(null);
        setNome('');
        setCargo('');
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Gestão de Funcionários</h2>
            
            <form onSubmit={salvar} className="form-card">
                <h3 className="form-title">
                    {editId ? "Editar Funcionário" : "Novo Funcionário"}
                </h3>
                <div className="form-row" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label className="input-label">Nome Completo</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Joao Silva" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Cargo / Função</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Operador de Escavadeira" 
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)} 
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

            <h3 className="section-subtitle">Funcionários Cadastrados</h3>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>#</th>
                            <th>Nome</th>
                            <th>Cargo / Função</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Nenhum funcionário cadastrado.
                                </td>
                            </tr>
                        ) : (
                            funcionarios.map((func, index) => (
                                <tr key={func.id}>
                                    <td>{index + 1}</td>
                                    <td>{func.nome}</td>
                                    <td>
                                        <span className="badge badge-info">{func.cargo}</span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-edit" 
                                            onClick={() => iniciarEdicao(func)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-delete" 
                                            onClick={() => deletar(func.id)}
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
