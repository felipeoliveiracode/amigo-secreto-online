import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Criar() {
    const [nomeGrupo, setNomeGrupo] = useState("");
    const [data, setData] = useState("");
    const [valor, setValor] = useState("");
    const [regras, setRegras] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novoGrupo = {
            nomeGrupo,
            data,
            valor,
            regras,
            criadoEm: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "grupos"), novoGrupo);
            navigate(`/participantes/${docRef.id}`);
        } catch (error) {
            console.error("Erro ao criar grupo:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Cabeçalho */}
                <div className="bg-red-600 p-6 text-center">
                    <h1 className="text-3xl font-bold text-white">Amigo Secreto Online</h1>
                    <p className="text-red-100 mt-2">Crie seu grupo e divirta-se!</p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="nomeGrupo" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Grupo
                        </label>
                        <input
                            id="nomeGrupo"
                            type="text"
                            placeholder="Ex: Família 2023, Time de Vendas, etc."
                            value={nomeGrupo}
                            onChange={(e) => setNomeGrupo(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                                Data da Revelação
                            </label>
                            <input
                                id="data"
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="valor" className="block text-sm font-medium text-gray-700 mb-1">
                                Valor Sugerido
                            </label>
                            <input
                                id="valor"
                                type="text"
                                placeholder="Ex: R$ 50,00"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="regras" className="block text-sm font-medium text-gray-700 mb-1">
                            Regras (opcional)
                        </label>
                        <textarea
                            id="regras"
                            placeholder="Ex: Presente deve ser relacionado a hobbies, Sem presentes de loja X, etc."
                            value={regras}
                            onChange={(e) => setRegras(e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                    >Avançar <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </form>

                {/* Rodapé */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-xs text-gray-500">Todos os dados são armazenados de forma segura</p>
                </div>
            </div>
        </div>
    );
}