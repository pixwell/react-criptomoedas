import { useSearchParams } from "react-router";
import { SEARCHFIELD_FIELDNAME } from "../../constants";

export function SearchResults() {
    const [searchParam] = useSearchParams();
    //query e o nome do campo de busca
    const searchTerm = searchParam.get(SEARCHFIELD_FIELDNAME);

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
                                {searchParam.get('query')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </main>
    )
    
}