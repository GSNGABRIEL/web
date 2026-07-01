import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
    const [cidades, setCidades] = useState([]);
    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        carregarCidades();
    }, []);

    const carregarCidades = async () => {
        try {
            const response = await cidadeService.listar();
            setCidades(response.data);
        } catch (error) {
            console.error("Erro ao buscar cidades", error);
        }
    };

    const salvar = async (e) => {
        e.preventDefault();
        if (!nome || !estado) return alert("Preencha todos os campos obrigatórios!");

        try {
            if (editId) {
                await cidadeService.atualizar(editId, { nome, estado });
                setEditId(null);
            } else {
                await cidadeService.criar({ nome, estado });
            }
            setNome('');
            setEstado('');
            carregarCidades();
        } catch (error) {
            console.error("Erro ao salvar cidade", error);
            alert("Erro ao realizar operação.");
        }
    };

    const deletar = async (id) => {
        if (!window.confirm("Deseja realmente excluir esta cidade?")) return;
        try {
            await cidadeService.excluir(id);
            if (editId === id) {
                cancelarEdicao();
            }
            carregarCidades();
        } catch (error) {
            console.error("Erro ao deletar cidade", error);
            alert("Erro ao excluir registro.");
        }
    };

    const iniciarEdicao = (cidade) => {
        setEditId(cidade.id);
        setNome(cidade.nome);
        setEstado(cidade.estado);
    };

    const cancelarEdicao = () => {
        setEditId(null);
        setNome('');
        setEstado('');
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Gestão de Cidades</h2>
            
            <form onSubmit={salvar} className="form-card">
                <h3 className="form-title">
                    {editId ? "Editar Cidade" : "Nova Cidade de Operação"}
                </h3>
                <div className="form-row" style={{ alignItems: 'flex-end' }}>
                    <div className="form-group">
                        <label className="input-label">Cidade</label>
                        <input 
                            type="text" 
                            className="input-control"
                            placeholder="Ex: Carajas" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Estado (UF)</label>
                        <select 
                            className="input-control"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)} 
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
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

            <h3 className="section-subtitle">Cidades Cadastradas</h3>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>#</th>
                            <th>Cidade</th>
                            <th style={{ width: '120px' }}>Estado</th>
                            <th style={{ width: '200px', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cidades.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Nenhuma cidade cadastrada.
                                </td>
                            </tr>
                        ) : (
                            cidades.map((cid, index) => (
                                <tr key={cid.id}>
                                    <td>{index + 1}</td>
                                    <td>{cid.nome}</td>
                                    <td>
                                        <span className="badge badge-info">{cid.estado}</span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-edit" 
                                            onClick={() => iniciarEdicao(cid)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            type="button"
                                            className="action-btn action-btn-delete" 
                                            onClick={() => deletar(cid.id)}
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
