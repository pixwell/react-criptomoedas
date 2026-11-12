import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getCoin, getCoinIcon } from "../../services/coinCapApi";
import { LoadingSpinner } from "../../components/loadingSpinner";
import type { Coin } from "../../types/coin";
import { ApiError } from "../../errors/apiError";
import { formatPrice, formatPriceCompact } from "../../utils/formatters";


export function CoinDetail() {
  const [coin, setCoin] = useState<Coin>();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [coinNotFound, setCoinNotFound] = useState<boolean>(false)
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
      
      //3. Atualiza o estado
      setCoin(moeda.data)

      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error.message);
        } else {
          console.error("Erro desconhecido.");
        }

        setCoinNotFound(true)

      } finally{
        setPageLoading(false)
      }
    }

    infosMoeda();

  }, [id])

  //Carregando
  if (pageLoading) {
    return <LoadingSpinner/>
  }

  //Moeda nao encontrada ou estado vazio
  if (coinNotFound || !coin) {
    return(
      <main className="container-detail mb-8 text-zinc-400">
        <Link to="/" className="block mb-8 text-center hover:text-white">	&#8592; Voltar para a lista</Link>

        <article className="rounded-lg bg-zinc-800 p-4 md:p-8">
          <h1 className="text-center text-4xl">Erro 404</h1>
          <p className="text-center">Moeda não encontrada. :'(</p>
        </article>
      </main>
    )
  }

  return (
    <main className="container-detail mb-8 text-zinc-400">
      <Link to="/" className="block mb-8 text-center hover:text-white">	&#8592; Voltar para a lista</Link>

      <article className="rounded-lg bg-zinc-800 p-4 md:p-8">
        <header className="header-grid">
          <img
            className="header-grid__icon"
            src={getCoinIcon(coin.symbol)}
            alt={`ícone da Moeda ${coin.name}`}
            onError={(e) => {
              e.currentTarget.src = '/icon-default.png'
            }}
          />
          <h1 className="header-grid__title">{`${coin.name} (${coin.symbol})`}</h1>
          <p className="header-grid__ranking">{`Ranking #${coin.rank}`}</p>

          <p className="header-grid__price">{formatPrice(Number(coin.priceUsd))}</p>
          <p className="header-grid__price-infos">Preço atual</p>
        </header>
      
      <section className="coin-detail-section mb-8">
        <h2 className="coin-detail-section__title">Informações de mercado</h2>
        <ul>
          <li className="coin-detail-section__list-item"><strong>Capitalização de mercado:</strong> {formatPriceCompact(Number(coin.marketCapUsd))}</li>
          <li className="coin-detail-section__list-item"><strong>Volume negociado (24h):</strong> {formatPriceCompact(Number(coin.volumeUsd24Hr))}</li>
          <li className="coin-detail-section__list-item">
            <strong>Variação (24h):</strong> 
            <span className={Number(coin.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500' }>
              {formatPriceCompact(Number(coin.changePercent24Hr))} {Number(coin.changePercent24Hr) > 0 ? '▲' : '▼'}
            </span>
          </li>
          <li className="coin-detail-section__list-item"><strong>Preço médio (VWAP 24h):</strong> {formatPrice(Number(coin.vwap24Hr))}</li>
        </ul>
      </section>
      
      <section className="coin-detail-section">
        <h2 className="coin-detail-section__title">Informações de oferta</h2>
        <ul>
          <li className="coin-detail-section__list-item">
            <strong>Oferta circulante:</strong>
            {`${formatPriceCompact(Number(coin.supply))} ${coin.symbol}`}
          </li>
          <li className="coin-detail-section__list-item">
            <strong>Oferta máxima:</strong>
            {coin.maxSupply ? (
              `${formatPriceCompact(Number(coin.maxSupply))} ${coin.symbol}`
            ) : (
              `---`
            )}
          </li>
          <li className="coin-detail-section__list-item">
            <strong>Explorador da blockchain ↗</strong>
            <Link to={coin.explorer}>{coin.explorer}</Link>
          </li>
        </ul>
      </section>

      </article>
    </main>
  )
}
