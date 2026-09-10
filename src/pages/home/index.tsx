import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import svgSpinner from '../../assets/spinner.svg'
import { ITEMS_PER_PAGE, getCoins } from "../../services/coinCapApi";
import type { Coin, FormattedCoin } from "../../types/coin";
import { formatPrice, formatPriceCompact } from "../../utils/formatters";

export function Home() {
  const [coins, setCoins] = useState<FormattedCoin[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  //Formata os valores da moeda para a interface
  function formatCoins(coinList: Coin[]): FormattedCoin[]{
    const list = coinList.map( item => {
      const {marketCapUsd, volumeUsd24Hr, priceUsd, changePercent24Hr, ...outrasProps} = item;

      return {
        ...outrasProps, //id, name e symbol
        marketCapUsd: formatPriceCompact(Number(marketCapUsd)), 
        volumeUsd24Hr: formatPriceCompact(Number(volumeUsd24Hr)), 
        priceUsd: formatPrice(Number(priceUsd)), 
        changePercent24Hr: Number(changePercent24Hr).toFixed(3),
      }
    })

    return list;
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    //Orquestrador
    async function listCoins() {

      try {
        //1. Ativa o Loading
        setPageLoading(true);

        //2. Busca os dados
        const lista = await getCoins(offset, signal);

        //3. Formata para a apresentacao
        const formattedList = formatCoins(lista.data);

        //4. Atualiza para o estado
        setCoins( prevCoins => [...prevCoins, ...formattedList]);

      } catch (error) {

        //filtrando o erro do AbortController
        if (error instanceof Error && error.name !== 'AbortError') {
          //So exibe o toast se nao for do AbortController
          toast.error(`Erro ao carregar lista: ${error.message}`);
        }

      } finally {
        //Correcao no loading por conta do efeito colateral do AbortController
        if (!signal?.aborted) {
          //Desativa o Loading
          setPageLoading(false);
        }
      }
    }

    listCoins();

    return () => controller.abort()
  }, [offset])

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
        <button 
        type="button" 
        className="btn bg-blue-700 hover:bg-blue-600 mx-auto mt-4 mb-8" 
        onClick={() => setOffset(prevOffset => prevOffset + ITEMS_PER_PAGE)}
        disabled={pageLoading}
        >          
          {pageLoading ? (<img width="18" height="18" src={svgSpinner} alt="Carregando" role="status" aria-live="polite" />) : ('Carregar mais ...')}
        </button>
      )}

    </div>
  )
}
