// src/pages/ResultadoBloqueado.jsx
export default function ResultadoBloqueado() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-4 text-center">
                <div className="text-red-500 text-5xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Acesso Bloqueado</h2>
                <p className="text-gray-700 mb-4">
                    Você já visualizou seu amigo secreto anteriormente.
                </p>
                <p className="text-sm text-gray-500">
                    Por segurança, o resultado só pode ser visualizado uma vez.
                </p>
            </div>
        </div>
    );
}