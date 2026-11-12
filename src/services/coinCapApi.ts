import type { CoinResponse, CoinDetailResponse } from "../types/coin";
import { ApiError } from "../errors/apiError";

export const ITEMS_PER_PAGE = 10;

function getApiUrl(endpoint: string = 'assets', limitParam?: number, offsetParam?: number): string{
  //Argumentos da URL
  const urlArgs:string[] = [];

  //Tem valor? Se sim, entra no array
  limitParam !== undefined && urlArgs.push(`limit=${limitParam}`)
  offsetParam !== undefined && urlArgs.push(`offset=${offsetParam}`)

  //Adiciona a api key
  urlArgs.push(`apiKey=${import.meta.env.VITE_COINCAP_API_KEY}`)

  //Monta a URL
  return `https://rest.coincap.io/v3/${endpoint}?${urlArgs.join('&')}`;
}

export function getCoinIcon(symbol: string): string{
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`
}

export async function getCoins(offset: number = 0, signal?: AbortSignal): Promise<CoinResponse>{
  try {
    //Requisicao inicial
    const response = await fetch(getApiUrl('assets', ITEMS_PER_PAGE, offset), {signal});
    //Trata o erro 404, que nao e tratado nativamente
    if (!response.ok) {
      throw new ApiError(`Erro HTTP ${response.status}`, response.status);
    }
    //Resposta convertida para JSON
    const data = await response.json();

    //Tooooma a lista!
    return data;
    
  } catch (error) {
    //Exibe o erro no console
    console.error('Erro ao buscar lista. ', error);
    //Devolve o erro para quem o chamou, assim a interface pode tratar
    throw error;
  }
}

export async function getCoin(id: string): Promise<CoinDetailResponse>{
  try {
    //Requisicao inicial
    const response = await fetch(getApiUrl(`assets/${id}`));

    //Trata o erro 404, que nao e tratado nativamente
    if (!response.ok) {
      throw new ApiError(`Erro HTTP ${response.status}`, response.status);
    }
    
    //Resposta convertida para JSON
    const data = await response.json();

    //Tooooma a moeda!
    return data;

  } catch (error) {
    //Exibe o erro no console
    console.error('Erro ao buscar moeda. ', error);
    //Devolve o erro para quem o chamou, assim a interface pode tratar
    throw error;
  }
}
