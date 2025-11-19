export interface MetaPagination {
  lastPage: number
  perPage: number
  total: number
  currentPage: number
  startIndex: number
  endIndex: number
}

export type TicketStatus =
  | 'CONFIRM'
  | 'PENDENT'
  | 'CANCELED'
  | 'DENIED'
  | 'ABANDONED'
export type TicketChannel = 'OFFLINE' | 'WEB' | 'APP ANDROID' | 'APP IOS'

export interface Ticket {
  locator: string
  ticketId: string
  sector: string
  product: string
  event: string
  status: TicketStatus
  transformedStatus: { label: string; color: string }
  value: number
  channel: TicketChannel
  createdAt: string
  orderId: number
}

export interface Summary {
  quantityConfirm: number
  quantityPendent: number
  quantityCanceled: number
  totalConfirm: number
  totalCanceled: number
  totalPendent: number
}

export interface Pdv extends Summary {
  posName: string
  posId: number
}

export interface Pos {
  id: number
  name: string
  address: string
  createdAt: string
}
export type PdvDevicesBleedingMoney = {
  product: string
  amount: number
  value: number
  cashBalance: number
}
export type PdvDevicesItem = {
  name: string
  amount: number
  value: number
  price: number
}
export type PdvDevicesCategoryTotals = {
  product: string
  amount: number
  value: number
}

export type PdvDevicesCategory = {
  moduleName: string
  totals: PdvDevicesCategoryTotals
  itens: PdvDevicesItem[]
}
export type Cashier = {
  cashierId: number
  pix: number
  cash: number
  credit: number
  debit: number
  total: number
  amount: number
  bleedingMoney: PdvDevicesBleedingMoney
  categories: PdvDevicesCategory[]
  serialDevice: string
  strDate: string
  lastCashierClosed: string
}
export interface DevicesSummary extends Summary {
  deviceId: number
  deviceSerial: string
  deviceHash: string
  companyName: string
  createdAt: string
  cashiers: Cashier[]
}

export type LoteStatus = 'ABERTO' | 'FECHADO'

export interface Lote {
  productId: number
  productName: string
  sectorId: number
  sectorName: string
  sequence: number
  amount: number
  used: number
  value: number
  total: number
  status: LoteStatus
  stockId: number
  tsStart: string
  tsEnded?: string
}

export interface EventoPromoter {
  name: string
  eventId: string
  tsEvent: string
}


interface EventDetail {
  activeEvent: boolean
  activePub: boolean
  activeParking: boolean
  address: string
  banner: string
  bannerDetail: string
  imageTicket: string
  categories: number[]
  city: string
  classification: string
  date: string
  description: string
  eventPolicy: string
  hour: string
  local: string
  localInfo: string
  descriptionTicket: string
  minimalDescription: string
  name: string
  products: number[]
  sectors: number[]
  posIds: number[]
}

export interface Event extends EventDetail {
  tsEvent: string
  name: string
  eventId: string
}

export interface EventsFinaci {
  eventFinancialSetupid: number
  eventId: [number]
  valueTaxInternet: number
  valueFeeByPrint: number
  valueRentalDevice: number
  fixedCost: number
  parc1: number
  parc2: number
  parc3: number
  parc4: number
  parc5: number
  parc6: number
  parc7: number
  parc8: number
  parc9: number
  parc10: number
  parc11: number
  parc12: number
  taxPIX: number
  taxDebit: number
  isOnlineSaleActivated: boolean
  productsId: []
}

export interface ChartVendaLote {
  dataId: number
  dataName: string
  dataTarget: number
  dataStatus: number
  percentageAchieved: number
}

export interface ChartVendaDia {
  dataStatus: 68
  day: string
}

export interface ResponseChartVendaLote {
  lotes: ChartVendaLote[]
  totalSalesTarget: number
  totalSalesAchieved: number
  overallPercentageAchieved: number
}

export interface ResponseChartVendaDia {
  lotes: ChartVendaDia[]
  totalSalesAchieved: number
}

interface SalesResultResource {
  amountSales: number
  totalSales: number
  amountCancel: number
  totalCancel: number
  amountTicket: number
  totalTickets: number
}

export interface ResponseSales {
  totalAmountSales: number
  totalSales: number
  totalAmountCancel: number
  totalCancel: number
  totalAmountTicket: number
  totalTickets: number
}

export interface SalesResultSetorResource extends SalesResultResource {
  sectorName: string
  batch: string
  price: number
}

export interface SalesResultPaymentTypeResource extends SalesResultResource {
  type: string
  description: string
}

export interface ResponseSalesBySector extends ResponseSales {
  salesBySectorResource: SalesResultSetorResource[]
}

export interface ResponseSalesPaymentType extends ResponseSales {
  salesByPaymentTypeResource: SalesResultPaymentTypeResource[]
}

export interface Setor {
  sectorId: string
  name: string
}

export interface Product {
  description: string
  productId: string
  name: string
}

export interface User {
  name: string
  email: string
  cellphone: string
  login: string
}

export interface Category {
  categoryName: string
  categoryId: string
}

export interface Device {
  deviceId: number
  serialNumber: string
  hash: string
  companyId: number
  posId: number
  description: string
}

export type OptionSelect = { label: string; value: number }

export interface Stock {
  stockId: number
  sectorId: number
  productId: number
  sector: string
  product: string
  value: number
  priceInsurance: number
  priceTax: number
  priceBase: number
  priceOtherTaxes: number
  priceDiscount: number
  amount: number
  sequence: number
  seatActive: boolean
}

export type ProductStock = {
  stockId: number
  sectorId: number
  productId: number
  sector: string
  product: string
  value: number
  priceInsurance: number
  priceTax: number
  priceBase: number
  priceOtherTaxes: number
  priceDiscount: number
  amount: number
  sequence: number
  seatActive: boolean
}

export interface Order {
  id: number
  code: string
  name: string
  strDate: string
  strDateSale: string
  eventType: string
  status: string
  amountSales: number
  value: number
  transformedStatus: { label: string; color: string }
}

export type GroupUser = {
  groupUserId: number
  name: string
}

export interface ProductResponse {
  productId: number
  description: string
  categoriesId: number
  url: string
  activeOrInactive: boolean
  file: string
}

export type SectorType = 'EVENT' | 'PUB' | 'PARKING' | ''

export interface PaginationData {
  registerPerPage: number
  currentPage: number
  totalCountofRegisters: number
  lastPage: number
  startIndex: number
  endIndex: number
}

export type SectorRequest = {
  name: string
  type: string
  pos: number[]
  products: number[]
}

export interface FilterSectorProps {
  name: string
  type: SectorType
}
export interface FilterPromoterProps {
  name: string
}

export interface POSRequest {
  id?: number
  name: string
  address: string
  createdAt: string
  isInternet: boolean
  sellers: number[]
  events?: number[]
}
export interface EventPromoter {
  eventId: number
  name: string
  sectors: number[]
}

export interface UserPromoter {
  id: number
  name: string
  login: string
}

export interface PromoterResponse {
  promoterId: number
  name: string
  document: string
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  email: string
  cellphone: string
  eventsId: number | null
  usersId: number | null
  events: Event[]
  users: UserPromoter[]
  isEnabled: boolean
}

export interface PromoterRequest {
  eventsId: number[]
  usersId: number[]
  name: string
  document: string
  email: string
  cellphone: string
  city: string | undefined
  state: string | undefined
  address: string | undefined
}

export interface PromoterEditRequest extends PromoterRequest {
  id: number
}
export interface Item {
  id: number
  name: string
  able?: boolean
}
export interface EventPOS {
  tsEvent: string
  name: string
  eventId: number
  city: string
}
export interface POS {
  posId?: number
  id?: number
  name: string
  address: string
  createdAt: string
  isInternet?: boolean
  sellers?: Item[]
  events?: EventPOS[]
}
export interface Sector {
  sectorId: number
  name: string
  type: SectorType
  products: Product[]
  pos: POS[]
  translatedType: string
}
export interface SectorByID {
  sectorId: number
  name: string
  type: SectorType
  products: { productId: number; name: string }[]
  pos: { posId: number; name: string }[]
  translatedType: string
}
export interface EditSectorRequest extends SectorRequest {
  id: number
}
export interface SectorsResponse {
  sectors: Sector[]
  pageData: PaginationData
}

export interface DeviceAddRequest {
  id?: number
  serialNumber?: string
  hash?: string
  posId?: number
  userId?: number
  firstAccess?: boolean
}
export interface DeviceEditRequest {
  id: number
  posId: number
  userId?: number
}
export interface POSItem {
  posId: number
  name: string
}
export interface DeviceResponse {
  deviceId: number
  serialNumber: string
  hash: string
  companyId: number | null
  posId: number | null
  userId: number | null
  pos: POSItem
  user: UserPromoter
  firstAccess: boolean
}
export interface DeviceHistory {
  deviceHistoryId: number
  deviceId: number
  namePos: string
  versionCode: string
  createdAt: string
}
export interface DevicesResponse {
  devices: DeviceResponse[]
  pageData: PaginationData
}
export interface EventData {
  eventId: number
  eventName: string
}
export interface ProductByPos {
  sectorId: number
  productId: number
  productName: string
  sectorName: string
  posIds: number[]
  eventId: number
  posList: POSItem[]
}

export interface ProductByPOSRequest {
  productId: number
  sectorId: number
  eventId: number
  posIds: number[]
}
export type ExportTypes = 'EXPORT_TICKET' | 'EXPORT_PAYMENT'

export interface UserAccount extends User {
  id: number
  isEnabled: boolean
  groups: GroupUser[]
  posResources: POSItem[]
}

export type TypeExpense = 'TRANSFER'

export interface ExpenseAddRequest {
  description: string
  value: string
  registerDate: string
  eventId: number
  responsible: string
  typeExpense: TypeExpense
  typeExpenseEnum: TypeExpense
}
export interface Expense extends ExpenseAddRequest {
  expenseId: number
}
export interface Option {
  value: string
  optionText: string
}

export interface CustomerReq {
  name: string
  document: string
  cellphone: string
  email: string
  address: string
  cep: string
  addressNumber: string
  complement: string
  city: string
  country: string
  password: string
  birthDate: string
  checkEmail: boolean
}
export interface Customer extends CustomerReq {
  id: number
}
export interface CustomerFilters {
  document: string
  emailPart: string
}
export type EnderecoCEPResponse = {
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
}
export interface ValidatedTicketsData {
  description: string
  totalTickets: number
  validatedTickets: number
  validationPercent: number
}

export interface DevicePdvFilter {
  serial: string
  hash: string
}
