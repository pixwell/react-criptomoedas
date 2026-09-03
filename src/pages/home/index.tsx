import { FaSearch } from "react-icons/fa";

export function Home() {
  return (
    <div className="container">
      <form className="flex justify-between items-center gap-6">
        <input type="text" name="coin-name" placeholder="Digite o nome da moeda. Ex.: Bitcoin" className="bg-white text-zinc-500 w-full rounded-md px-4 py-2" />
        <button type="submit">
          <FaSearch size={28} color="#E4E4E7"/>
        </button>
      </form>

      
    </div>
  )
}
