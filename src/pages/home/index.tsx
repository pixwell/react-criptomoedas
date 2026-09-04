import { FaSearch } from "react-icons/fa";

export function Home() {
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
          <tr>
            <td data-label="Moeda">Bitcoin | BTC</td>
            <td data-label="Valor de Mercado">$1.3T</td>
            <td data-label="Preço">$65.000,67</td>
            <td data-label="Volume">$17B</td>
            <td data-label="Mudança 24h">0.027</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}
