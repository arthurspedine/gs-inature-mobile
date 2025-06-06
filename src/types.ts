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

export type OpenMeteoResponse = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number

  current_units: {
    time: string
    interval: string
    precipitation: string
    temperature_2m: string
    relative_humidity_2m: string
    rain: string
    weather_code: string
  }

  current: {
    time: string
    interval: number
    precipitation: number
    temperature_2m: number
    relative_humidity_2m: number
    rain: number
    weather_code: number
  }

  daily_units: {
    time: string
    precipitation_sum: string
  }

  daily: {
    time: string[]
    precipitation_sum: number[]
  }
}

export type ViaCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: string
}
