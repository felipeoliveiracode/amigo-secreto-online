import { useParams, useNavigate } from "react-router-dom"; // Adicionei useNavigate
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaSpinner, FaGift, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import Confetti from 'react-confetti';

export default function Resultado() {
    const { idGrupo, uuid } = useParams();
    const navigate = useNavigate(); // Adicionei o hook navigate
    const [grupoInfo, setGrupoInfo] = useState(null);
    const [dados, setDados] = useState(null);
    const [mostrar, setMostrar] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [showConfetti, setShowConfetti] = useState(false);

    // Corrigi o nome da variável idGrupo (estava idGrupo)
    useEffect(() => {
        const verificarVisualizacao = async () => {
            const resultadoRef = doc(db, "grupos", idGrupo, "resultados", uuid);
            const docSnap = await getDoc(resultadoRef);
            
            if (docSnap.exists()) {
                if (docSnap.data().visualizado) {
                    navigate('/resultado-bloqueado');
                } else {
                    setDados(docSnap.data());
                }
            }
        };
        
        verificarVisualizacao();
    }, [idGrupo, uuid, navigate]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const revelarNome = async () => {
        setCarregando(true);
        try {
            // Atualizar no Firestore que foi visualizado
            const resultadoRef = doc(db, "grupos", idGrupo, "resultados", uuid);
            await updateDoc(resultadoRef, {
                visualizado: true,
                visualizadoEm: new Date()
            });

            setTimeout(() => {
                setCarregando(false);
                setMostrar(true);
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }, 2000);
        } catch (error) {
            console.error("Erro ao registrar visualização:", error);
            setCarregando(false);
        }
    };

    useEffect(() => {
        const buscarResultado = async () => {
            try {
                // Buscar informações do grupo
                const grupoRef = doc(db, "grupos", idGrupo);
                const grupoSnapshot = await getDoc(grupoRef);

                if (grupoSnapshot.exists()) {
                    setGrupoInfo(grupoSnapshot.data());
                } else {
                    setGrupoInfo({ erro: "Informações do grupo não encontradas." });
                }
            } catch (error) {
                setGrupoInfo({ erro: "Erro ao buscar grupo." });
            }
        };

        // Só busca informações do grupo se não tiver redirecionado
        if (dados && !dados.erro) {
            buscarResultado();
        }
    }, [idGrupo, dados]);

    if (!dados) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-red-600 mx-auto mb-4" />
                    <p className="text-xl font-medium">Carregando seu resultado...</p>
                </div>
            </div>
        );
    }

    if (dados.erro) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4 text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
                    <p className="text-gray-700 mb-4">{dados.erro}</p>
                    <p className="text-sm text-gray-500">Verifique se o link está correto ou entre em contato com o organizador.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8 px-4">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                />
            )}

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Cabeçalho */}
                <div className="bg-red-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">Seu Amigo Secreto</h1>
                    <p className="text-red-100 mt-1">Prepare o presente com carinho!</p>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="inline-block bg-red-100 p-4 rounded-full mb-3">
                            <FaGift className="text-red-600 text-3xl" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Olá, {dados.participanteNome}!</h2>
                        <p className="text-gray-600">Aqui está o resultado do seu sorteio</p>
                    </div>

                    {/* Informações do grupo */}
                    {grupoInfo && !grupoInfo.erro && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                                <FaInfoCircle className="mr-2 text-red-500" />
                                Informações do Grupo
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <span className="font-medium w-24 flex-shrink-0">Grupo:</span>
                                    <span>{grupoInfo.nomeGrupo}</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-medium w-24 flex-shrink-0">Data:</span>
                                    <span className="flex items-center">
                                        <FaCalendarAlt className="mr-1 text-gray-500" />
                                        {new Date(grupoInfo.data).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-medium w-24 flex-shrink-0">Valor:</span>
                                    <span className="flex items-center">
                                        <FaMoneyBillWave className="mr-1 text-gray-500" />
                                        {Number(grupoInfo.valor)?.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"
                                        })}
                                    </span>
                                </li>
                                {grupoInfo.regras && (
                                    <li className="flex items-start">
                                        <span className="font-medium w-24 flex-shrink-0">Regras:</span>
                                        <span>{grupoInfo.regras}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Resultado */}
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Você tirou:</h3>

                        {carregando && (
                            <div className="flex flex-col items-center py-8">
                                <FaSpinner className="animate-spin text-4xl text-red-600 mb-4" />
                                <p className="font-medium text-gray-600">Preparando a revelação...</p>
                            </div>
                        )}

                        {mostrar && !carregando && (
                            <div className="animate-bounce-in">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 inline-block">
                                    <p className="text-3xl font-bold text-green-700">{dados.tirouNome}</p>
                                </div>
                                <p className="mt-4 text-green-600 font-medium">🎉 Hora de preparar o presente especial! 🎉</p>
                                 <p className="mt-4 text-green-600 font-medium">⚠️ Atenção: Após fechar essa página, o seu acesso será bloqueado e não será possível ver o seu amigo secreto novamente.</p>
                            </div>
                        )}

                        {!mostrar && !carregando && (
                            <div className="mt-6">
                                <button
                                    onClick={revelarNome}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
                                >
                                    Revelar Amigo Secreto
                                </button>
                                <p className="text-sm text-gray-500 mt-2">Clique no botão acima para descobrir</p>
                            </div>
                        )}
                    </div>

                    {/* Rodapé */}
                    <div className="text-center text-xs text-gray-500 mt-8">
                        <p>Este resultado é único e pessoal. Mantenha o segredo!</p>
                        <p className="mt-1">Amigo Secreto Online - {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}