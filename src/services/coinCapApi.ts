import type { CoinResponse, CoinDetailResponse, CoinSearchResponse } from "../types/coin";
import { ApiError } from "../errors/apiError";
import { ITEMS_PER_PAGE } from "../constants";

interface GetApiUrlParams {
  endpoint?: string; 
  search?: string; 
  limit?: number; 
  offset?: number;
}

function getApiUrl({endpoint = 'assets', search, limit, offset}:GetApiUrlParams = {}): string{
  //Argumentos da URL
  const urlArgs:string[] = [];

  //Tem valor? Se sim, entra no array
  search !== undefined && urlArgs.push(`search=${encodeURIComponent(search)}`)
  limit !== undefined && urlArgs.push(`limit=${limit}`)
  offset !== undefined && urlArgs.push(`offset=${offset}`)

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
    const response = await fetch(getApiUrl({limit: ITEMS_PER_PAGE, offset}), {signal});
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
    const response = await fetch(getApiUrl({endpoint: `assets/${id}`}));

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

export async function searchCoins(search: string, offset: number = 0, signal?: AbortSignal): Promise<CoinSearchResponse>{
  try {
    //Requisicao inicial
    const response = await fetch(getApiUrl({endpoint: 'agentFriendly/assets_search', search, offset, limit: ITEMS_PER_PAGE}), {signal});
    
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
    console.error('Erro ao pesquisar moeda. ', error);
    //Devolve o erro para quem o chamou, assim a interface pode tratar
    throw error;
  }
}
