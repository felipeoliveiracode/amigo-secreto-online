// src/components/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import { FaGift, FaUsers, FaHome, FaAd, FaInfoCircle, FaStar } from "react-icons/fa";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Cabeçalho */}
            <header className="bg-red-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <FaGift className="text-2xl" />
                        <h1 className="text-2xl font-bold">AmigoSecretoOnline</h1>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="hover:underline flex items-center gap-1">
                            <FaHome /> Início
                        </Link>
                        <Link to="/como-funciona" className="hover:underline flex items-center gap-1">
                            <FaInfoCircle /> Como funciona
                        </Link>
                        <Link to="/premium" className="hover:underline flex items-center gap-1">
                            <FaStar /> Versão Premium
                        </Link>
                    </nav>
                    <button className="md:hidden">☰</button>
                </div>
            </header>

            {/* Espaço para anúncio (topo) */}
            <div className="bg-gray-100 py-2 px-4 text-center border-b">
                <div className="container mx-auto">
                    <span className="text-xs text-gray-500">Anúncio</span>
                    <div className="h-[90px] bg-gray-200 flex items-center justify-center">
                        {/* Espaço reservado para adsense */}
                        <FaAd className="text-2xl text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <main className="flex-grow container mx-auto px-4 py-6">
                <Outlet />
            </main>

            {/* Espaço para anúncio (rodapé) */}
            <div className="bg-gray-100 py-2 px-4 text-center border-t">
                <div className="container mx-auto">
                    <span className="text-xs text-gray-500">Anúncio</span>
                    <div className="h-[90px] bg-gray-200 flex items-center justify-center">
                        {/* Espaço reservado para adsense */}
                        <FaAd className="text-2xl text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Rodapé */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-3">Amigo Secreto Online</h3>
                        <p className="text-gray-400">A maneira mais fácil de organizar seu amigo secreto.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/termos" className="text-gray-400 hover:text-white">Termos de Uso</Link></li>
                            <li><Link to="/privacidade" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Redes Sociais</h4>
                        {/* Ícones de redes sociais */}
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Newsletter</h4>
                        <form className="flex">
                            <input type="email" placeholder="Seu email" className="px-3 py-2 text-gray-800 rounded-l" />
                            <button className="bg-red-600 px-3 py-2 rounded-r">OK</button>
                        </form>
                    </div>
                </div>
                <div className="container mx-auto px-4 pt-6 mt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} AmigoSecretoOnline - Todos os direitos reservados
                </div>
            </footer>
        </div>
    );
}