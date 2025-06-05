export type NewsType = {
  id: number
  titulo: string
  dataPublicacao: string
  resumo: string
  corpo: string
  imagemCapa: string
  autor: string
}

type Localizacao = {
  cidade: string
  bairro: string
  logradouro: string
  numero: string
}

export type ReportType = {
  id: number
  titulo: string
  corpo: string
  tipo: "ENCHENTE" | "DESABAMENTO" | "QUEIMADA"
  data: string
  usuarioNome: string
  localizacao: Localizacao
  usuarioConfirmou: boolean
  quantidadeConfirmacoes: number
}
