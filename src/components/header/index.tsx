import { useLocation, Link } from "react-router";

export function Header() {
  const location = useLocation();

  return (
    <div className="container py-10">
      <h1 className="text-5xl text-center"><span className="text-blue-800 text-bold">Dev</span>Cripto</h1>
      
      {/* Se nao for a Home, carregar o link de voltar */}

      {location.pathname !== '/' && (
        <Link to="/" className="block my-8 text-center text-zinc-400 hover:text-white">	&#8592; Voltar para a lista</Link>
      )}
    </div>
  )
}
