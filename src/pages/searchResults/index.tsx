import { useSearchParams } from "react-router";
import { SEARCHFIELD_FIELDNAME } from "../../constants";
import { useEffect, useState } from "react";
import { searchCoins } from "../../services/coinCapApi";
import toast from "react-hot-toast";
import type { CoinSearch } from "../../types/coin";
import { formatPrice, formatPriceCompact } from "../../utils/formatters";

export function SearchResults() {
    const [coinsResult, setCoinsResult] = useState<CoinSearch[]>([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const [searchParam] = useSearchParams();
    //query e o nome do campo de busca
    const searchTerm = searchParam.get(SEARCHFIELD_FIELDNAME);

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

                setCoinsResult(formattedList);

                //4. Atualiza para o estado
                //setCoins( prevCoins => [...prevCoins, ...formattedList]);
                
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

    }, [searchTerm])

    return (
        <main className="container">
            <article>
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
                        <tr>
                            <td colSpan={5}>
                                {searchParam.get(SEARCHFIELD_FIELDNAME)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </main>
    )
    
}