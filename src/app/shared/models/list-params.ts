import { listType } from "./list-type";

export type ListParams = {
  searchTerm?: string; //search term
  listType: listType; //tipo da lista principal
  limit: number; //limite de itens por página
  offset: number; //offset para paginação
  itemId?: string; //id do item para buscar detalhes
  itemType?: listType; //tipo item principal
};