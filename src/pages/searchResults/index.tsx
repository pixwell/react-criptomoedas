import { Link, useSearchParams } from "react-router";
import { ITEMS_PER_PAGE, SEARCH_FIELD_NAME } from "../../constants";
import { useEffect, useState } from "react";
import { searchCoins } from "../../services/coinCapApi";
import toast from "react-hot-toast";
import type { CoinSearch } from "../../types/coin";
import { formatPrice, formatPriceCompact } from "../../utils/formatters";
import { LoadingSpinner } from "../../components/loadingSpinner";
import svgSpinner from '../../assets/spinner.svg';
import { ROUTES } from "../../routes/route-list";

export function SearchResults() {
    const [coinsResult, setCoinsResult] = useState<CoinSearch[]>([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const [searchParam] = useSearchParams();
    //query e o nome do campo de busca
    const searchTerm = searchParam.get(SEARCH_FIELD_NAME);

    //Formata os valores da moeda para a interface
    function formatCoins(coinList: CoinSearch[]): CoinSearch[]{
        const list = coinList.map( item => {
            const {marketCap, volume, price, changePercent24Hr, ...outrasProps} = item;

            return {
            ...outrasProps, //id, name e symbol
            marketCap: formatPriceCompact(Number(marketCap)),
            volume: formatPriceCompact(Number(volume)),
            price: formatPrice(Number(price)),
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
            
            if(!searchTerm){
                return;
            }

            try {
                //1. Ativa o Loading
                setPageLoading(true);

                //2. Busca os dados
                const lista = await searchCoins(searchTerm, offset, signal);

                //3. Formata para a apresentacao
                const formattedList = formatCoins(lista.data);

                //4. Atualiza para o estado
                setCoinsResult( prevCoins => [...prevCoins, ...formattedList]);
                
            } catch (error) {
                
                //filtrando o erro do AbortController
                if (error instanceof Error && error.name !== 'AbortError') {
                    //So exibe o toast se nao for do AbortController
                    toast.error(`Erro ao pesquisar moeda: ${error.message}`);
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

    }, [searchTerm, offset])

    return (
        <main className="container">
            <article>
                <h2 className="text-center text-xl font-normal p-2 mb-5 bg-zinc-700 text-zinc-400 rounded-lg">Resultado da busca por: <span className="font-bold text-white">{searchTerm}</span></h2>
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

                        {coinsResult.length > 0 ? (
                            coinsResult.map(moeda => (
                                <tr key={moeda.slug}>
                                    <td data-label="Moeda">
                                        <Link to={ROUTES.coinDetail.link(moeda.slug)} className="flex items-center justify-start gap-2">
                                            <img 
                                            className="img-fluid rounded-full size-8" 
                                            src={`https://assets.coincap.io/assets/icons/${moeda.symbol.toLowerCase()}@2x.png`} 
                                            alt="Logo da Moeda" 
                                            onError={(e)=>{
                                                e.currentTarget.src = '/icon-default.png'
                                            }}
                                            />
                                            {moeda.name}
                                        </Link>
                                    </td>
                                    <td data-label="Valor de Mercado">{moeda.marketCap}</td>
                                    <td data-label="Preço">{moeda.price}</td>
                                    <td data-label="Volume">{moeda.volume}</td>
                                    <td data-label="Mudança 24h" className={Number(moeda.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500' }>
                                    {moeda.changePercent24Hr}%
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>
                                    <div className="flex items-center justify-center min-h-40">
                                        {pageLoading ? (<img width="56" height="56" src={svgSpinner} alt="Carregando" role="status" aria-live="polite"  />) : ('Nenhuma moeda encontrada.')}
                                    </div>
                                </td>
                            </tr>
                        )}

                        
                    </tbody>
                </table>
                {coinsResult.length > 0 && (
                    <button 
                    type="button" 
                    className="btn bg-blue-700 hover:bg-blue-600 mx-auto mt-4 mb-8" 
                    onClick={() => setOffset(prevOffset => prevOffset + ITEMS_PER_PAGE)}
                    disabled={pageLoading}
                    >          
                    {pageLoading ? (<img width="18" height="18" src={svgSpinner} alt="Carregando" role="status" aria-live="polite" />) : ('Carregar mais ...')}
                    </button>
                )}
            </article>
        </main>
    )
    
}