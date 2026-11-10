import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getCoin } from "../../services/coinCapApi";
import { LoadingSpinner } from "../../components/loadingSpinner";


export function CoinDetail() {
  const [coin, setCoin] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    async function infosMoeda(){
      if(!id){
        return;
      }

      try {
      //1. Ativa o Loading
      setPageLoading(true);

      //2. Busca os dados
      const moeda = await getCoin(id);

      console.log(moeda.data)

      } catch (error) {
        if (error instanceof Error) {
          console.error(`Erro ao carregar o carro: ${error.message}`);
        } else {
          console.error("Erro desconhecido ao carregar o carro.");
        }
      } finally{
        setPageLoading(false)
      }
    }

    infosMoeda();

  }, [id])

  if (pageLoading) {
    return <LoadingSpinner/>
  }

  return (
    <main className="container-detail mb-8 text-zinc-400">
      <Link to="/" className="block mb-8 text-center hover:text-white">	&#8592; Voltar para a lista</Link>

      <article className="rounded-lg bg-zinc-800 p-4 md:p-8">
        <header className="header-grid">
          <img
            className="header-grid__icon"
            src={`https://assets.coincap.io/assets/icons/btc@2x.png`}
            alt="Logo da Moeda"
            onError={(e) => {
              e.currentTarget.src = '/icon-default.png'
            }}
          />
          <h1 className="header-grid__title">Nome da Moeda (Symbol)</h1>
          <p className="header-grid__ranking">Ranking #1</p>

          <p className="header-grid__price text-green-500">Valor &#9650; &#9660;</p>
          <p className="header-grid__price-infos">Preço atual</p>
        </header>
      
      <section className="coin-detail-section mb-8">
        <h2 className="coin-detail-section__title">Informações de mercado</h2>
        <ul>
          <li className="coin-detail-section__list-item"><strong>Capitalização de mercado:</strong> US$ 1,35 tri</li>
          <li className="coin-detail-section__list-item"><strong>Volume negociado (24h):</strong> US$ 28,5 bi</li>
          <li className="coin-detail-section__list-item"><strong>Variação (24h):</strong> +2,45%</li>
          <li className="coin-detail-section__list-item"><strong>Preço médio (VWAP 24h):</strong> US$ 67.920,00</li>
        </ul>
      </section>
      
      <section className="coin-detail-section">
        <h2 className="coin-detail-section__title">Informações de oferta</h2>
        <ul>
          <li className="coin-detail-section__list-item"><strong>Oferta circulante:</strong> 19,8 mi BTC</li>
          <li className="coin-detail-section__list-item"><strong>Oferta máxima:</strong> 21 mi BTC</li>
          <li className="coin-detail-section__list-item"><strong>Explorador da blockchain</strong> <Link to="/">21 mi BTC ↗</Link></li>
        </ul>
      </section>

      </article>
    </main>
  )
}
