import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getCoins } from "../../services/coinCapApi";
import type { Coin } from "../../types/coin";
import { LoadingSpinner } from "../../components/loadingSpinner";

export function Home() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [pageLoading, setPageLoading] = useState(false)

  async function listCoins() {

    try {
      //Loading ativado
      setPageLoading(true)
      //Buscando dados
      const lista = await getCoins()
      setCoins(lista.data)
    } catch (error) {
      //Erro
    } finally {
      //Loading desativado
      setPageLoading(false)
    }
  }

  useEffect(() => {
    listCoins()
  }, [])

  if (pageLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container">

      <form className="flex justify-between items-center gap-6 mb-10">
        <input type="text" name="coin-name" placeholder="Digite o nome da moeda. Ex.: Bitcoin" className="bg-white text-zinc-500 w-full rounded-md px-4 py-2" />
        <button type="submit">
          <FaSearch size={28} color="#E4E4E7" />
        </button>
      </form>

      <table className="coin-responsive-table">
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Valor de Mercado</th>
            <th>Preço</th>
            <th>Volume</th>
            <th>Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 ? (
            coins.map(moeda => (
              <tr key={moeda.id}>
                <td data-label="Moeda">{moeda.name}</td>
                <td data-label="Valor de Mercado">{moeda.marketCapUsd}</td>
                <td data-label="Preço">{moeda.priceUsd}</td>
                <td data-label="Volume">{moeda.volumeUsd24Hr}</td>
                <td data-label="Mudança 24h">{moeda.changePercent24Hr}</td>
              </tr>
            )
            )
          ) : (
            <tr>
              <td colSpan={5} className="text-center">Nenhuma moeda encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      {coins.length > 0 && (
        <button type="button" className="btn bg-blue-700 hover:bg-blue-600 mx-auto my-3">Carregar mais ...</button>
      )}

    </div>
  )
}
