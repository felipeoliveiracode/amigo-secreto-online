import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    setDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { sortearAmigoSecreto } from "../utils/sorteio";
import { FaTrash, FaSpinner, FaCopy } from "react-icons/fa";

export default function Participantes() {
    const { idGrupo } = useParams();
    const [nome, setNome] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [copiedLink, setCopiedLink] = useState(null);

    const participantesRef = collection(db, "grupos", idGrupo, "participantes");

    const adicionarParticipante = async (e) => {
        e.preventDefault();
        if (!nome.trim()) return;

        try {
            setIsLoading(true);
            await addDoc(participantesRef, {
                nome: nome.trim(),
                criadoEm: new Date(),
            });
            setNome("");
        } catch (error) {
            console.error("Erro ao adicionar participante:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const excluirParticipante = async (id) => {
        if (!id || resultados.length > 0) return;

        try {
            setDeletingId(id);
            await deleteDoc(doc(db, "grupos", idGrupo, "participantes", id));
        } catch (error) {
            console.error("Erro ao excluir participante:", error);
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        const q = query(participantesRef, orderBy("criadoEm", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setParticipantes(lista);
        });

        return () => unsubscribe();
    }, [idGrupo]);

    const realizarSorteio = async () => {
        if (participantes.length < 3) return;

        setIsLoading(true);
        const resultado = sortearAmigoSecreto(participantes);

        try {
            for (const item of resultado) {
                const docRef = doc(db, "grupos", idGrupo, "resultados", item.uuid);
                await setDoc(docRef, {
                    participanteId: item.participanteId,
                    participanteNome: item.participanteNome,
                    tirouNome: item.tirouNome,
                    criadoEm: new Date(),
                    visualizado: false // Novo campo
                });
            }

            setResultados(resultado);
        } catch (error) {
            console.error("Erro ao salvar resultados:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text, uuid) => {
        navigator.clipboard.writeText(text);
        setCopiedLink(uuid);
        setTimeout(() => setCopiedLink(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Cabeçalho */}
                <div className="bg-red-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">Adicionar Participantes</h1>
                    <p className="text-red-100 mt-1">Grupo: {idGrupo}</p>
                </div>

                {/* Formulário */}
                <form onSubmit={adicionarParticipante} className="p-6">
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Nome do participante"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition disabled:opacity-50"
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                "Add"
                            )}
                        </button>
                    </div>

                    {/* Lista de participantes */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-3 text-gray-700">
                            Participantes ({participantes.length})
                        </h2>
                        {participantes.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Nenhum participante adicionado ainda</p>
                        ) : (
                            <ul className="space-y-2">
                                {participantes.map((p) => (
                                    <li
                                        key={p.id}
                                        className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-2">{p.nome}</span>
                                        </div>
                                        {resultados.length === 0 && (
                                            <button
                                                onClick={() => excluirParticipante(p.id)}
                                                disabled={deletingId === p.id}
                                                className="cursor-pointer opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition"
                                                title="Excluir participante"
                                            >
                                                {deletingId === p.id ? (
                                                    <FaSpinner className="animate-spin" />
                                                ) : (
                                                    <FaTrash />
                                                )}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Botão de sorteio */}
                    {participantes.length >= 3 && (
                        <div className="text-center">
                            <button
                                onClick={realizarSorteio}
                                disabled={isLoading || resultados.length > 0}
                                className={`w-full py-3 px-4 rounded-lg font-bold transition ${resultados.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin mr-2" />
                                        Sorteando...
                                    </span>
                                ) : resultados.length > 0 ? (
                                    "Sorteio Realizado!"
                                ) : (
                                    "Sortear Amigo Secreto"
                                )}
                            </button>
                        </div>
                    )}

                    {/* Resultados do sorteio */}
                    {resultados.length > 0 && (
                        <div className="mt-8">
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                                <h3 className="font-bold text-green-800">Sorteio realizado com sucesso!</h3>
                                <p className="text-green-700 text-sm">Abaixo estão os links individuais para cada participante:</p>
                            </div>

                            <ul className="space-y-3">
                                {resultados.map((r) => {
                                    const fullUrl = `${window.location.origin}/resultado/${idGrupo}/${r.uuid}`;
                                    return (
                                        <li key={r.uuid} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium">{r.participanteNome}</span>
                                                <button
                                                    onClick={() => copyToClipboard(fullUrl, r.uuid)}
                                                    className="cursor-pointer text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded flex items-center"
                                                >
                                                    {copiedLink === r.uuid ? 'Copiado!' : (
                                                        <>
                                                            <FaCopy className="mr-1" /> Copiar
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <a
                                                href={`/resultado/${idGrupo}/${r.uuid}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm break-all"
                                            >
                                                {fullUrl}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}