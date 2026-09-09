import type { CoinResponse } from "../types/coin";

export const ITEMS_PER_PAGE = 10;

function getApiUrl(endpoint: string = 'assets', limit: number = ITEMS_PER_PAGE, offset: number = 0): string{
  return `https://rest.coincap.io/v3/${endpoint}?limit=${limit}&offset=${offset}&apiKey=${import.meta.env.VITE_COINCAP_API_KEY}`;
}

export async function getCoins(offset: number = 0): Promise<CoinResponse>{
  try {
    //Requisicao inicial
    const response = await fetch(getApiUrl('assets', ITEMS_PER_PAGE, offset));
    //Trata o erro 404, que nao e tratado nativamente
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    //Resposta convertida para JSON
    const data = await response.json();

    //Tooooma a lista!
    return data;
    
  } catch (error) {
    //Exibe o erro no console
    console.error('Erro ao buscar lista: ', error);
    //Devolve o erro para quem o chamou, assim a interface pode tratar
    throw error;
  }
}
