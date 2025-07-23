// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { FaArrowRight, FaUsers, FaShieldAlt, FaMobileAlt } from "react-icons/fa";

export default function Home() {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <section className="py-12 md:py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                    Organize seu Amigo Secreto <span className="text-red-600">Online</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    De forma fácil, segura e sem complicações. Crie seu sorteio em menos de 2 minutos!
                </p>
                <Link
                    to="/criar"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105"
                >
                    Criar Agora <FaArrowRight className="inline ml-2" />
                </Link>
            </section>

            {/* Features */}
            <section className="py-12 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-red-500 text-4xl mb-4">
                        <FaUsers />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Fácil de Usar</h3>
                    <p className="text-gray-600">
                        Interface intuitiva que qualquer pessoa consegue usar, sem necessidade de cadastro.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-red-500 text-4xl mb-4">
                        <FaShieldAlt />
                    </div>
                    <h3 className="text-xl font-bold mb-2">100% Seguro</h3>
                    <p className="text-gray-600">
                        Sorteio criptografado e links individuais para cada participante.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-red-500 text-4xl mb-4">
                        <FaMobileAlt />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
                    <p className="text-gray-600">
                        Funciona perfeitamente em celulares e tablets. Acesse de qualquer lugar!
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-red-50 rounded-xl my-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Crie seu amigo secreto agora mesmo e surpreenda seus amigos!
                </p>
                <Link
                    to="/criar"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                    Criar Meu Amigo Secreto
                </Link>
            </section>
        </div>
    );
}