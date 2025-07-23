import { FaCheck } from "react-icons/fa";

// src/pages/Premium.jsx
export default function Premium() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Versão Premium</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-red-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Premium</h2>
          <p className="text-4xl font-bold mb-6">R$ 9,90<span className="text-lg text-gray-500">/mês</span></p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Sem anúncios</li>
            <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> +10 temas personalizados</li>
            <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Lista de desejos integrada</li>
          </ul>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold">
            Assinar Agora
          </button>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Por que assinar?</h3>
          <p className="mb-4">A versão premium oferece uma experiência livre de anúncios e com recursos exclusivos:</p>
          <ul className="space-y-2">
            <li>• Personalização completa do seu evento</li>
            <li>• Lembretes automáticos para participantes</li>
            <li>• Suporte prioritário</li>
          </ul>
        </div>
      </div>
    </div>
  );
}