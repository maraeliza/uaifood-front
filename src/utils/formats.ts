import { TypeExpense } from './interfaces'

export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return ''
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1')
}

export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}
export function isValidCEP(cep: string): boolean {
  return /^\d{8}$/.test(cep) || /^\d{5}-\d{3}$/.test(cep)
}

export const formatTypeExpense = (value: TypeExpense) => {
  switch (value) {
    case 'TRANSFER':
      return 'Transferência'

    default:
      return 'Transferência'
  }
}
