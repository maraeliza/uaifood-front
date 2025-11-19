import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { getIronSession } from 'iron-session'
import { SessionData, sessionOptions } from '@/lib/iron'
import { NextRouter, useRouter } from 'next/router'
import useSession from '@/hooks/useSession'
import { getSession } from '@/lib/serviceDatabase'

export type CookieParse = {
  token: string | undefined
}

export const PERMISSIONS = {
  SELL_TICKET: ['ADMIN_TICKET_REGISTER_SALES_IN_ADMIN'],
  CONSULT_SELLS_TICKETS: ['ADMIN_TICKET_CONSULT_SALES_IN_ADMIN'],
  CANCEL_SELLS_TICKETS: ['ADMIN_TICKET_CANCEL_SALES_IN_ADMIN'],
  ADMIN_ORDEM_EVENT_ALTER: ['ADMIN_ORDEM_EVENT_ALTER'],

  CANCEL_TICKETS: ['ADMIN_TICKETS_CANCEL'],
  CONSULT_TICKETS: ['ADMIN_TICKETS_CONSULT'],
  VALIDATE_TICKETS: ['ADMIN_TICKETS_VALIDATE'],

  CONSULT_USERS: ['ADMIN_USER_CONSULT'],
  INSERT_USER: ['ADMIN_USER_NEW'],
  ENABLE_USER: ['ADMIN_USER_ENABLE_DISABLE'],
  ALTER_PASS_USER: ['ADMIN_USER_ALTER_PASS'],
  ALTER_USER: ['ADMIN_USER_ALTER_PASS'],

  CONSULT_FINANCIAL_RESULT: ['ADMIN_FINANCIAL_RESULT'],
  ADMIN_TICKETS_VALIDATE: ['ADMIN_TICKETS_VALIDATE'],
  ADMIN_FINANCIAL_RESULT: ['ADMIN_FINANCIAL_RESULT'],
  ADMIN_TARIFA: ['ADMIN_EVENT_FINANCIAL_SETUP'],

  GERENCIAR_PRECOS_BAR: ['ADMIN_PRICE_PUB'],
  GERENCIAR_PRECOS_ESTACIONAMENTO: ['ADMIN_PRICE_PARKING'],
  GERENCIAR_PRECOS_LOTES: ['ADMIN_PRICE_EVENT_CONSULT'],

  PDVS: ['ADMIN_PDV_CONSULTA'],

  ENABLE_PRODUCT: ['ADMIN_PRODUCT_ENABLE_DISABLE'],
  CONSULT_PRODUCTS: ['ADMIN_PRODUCT_CONSULT'],
  ALTER_PRODUCT: ['ADMIN_PRODUCT_ALTER'],
  INSERT_PRODUCT: ['ADMIN_PRODUCT_NEW'],

  ENABLE_SECTOR: ['ADMIN_SECTOR_ENABLE_DISABLE'],
  CONSULT_SECTORS: ['ADMIN_SECTOR_CONSULT'],
  ALTER_SECTOR: ['ADMIN_SECTOR_ALTER'],
  INSERT_SECTOR: ['ADMIN_SECTOR_NEW'],

  ENABLE_PROMOTER: ['ADMIN_PROMOTER_ENABLE_DISABLE'],
  CONSULT_PROMOTERS: ['ADMIN_PROMOTER'],
  ALTER_PROMOTER: ['ADMIN_PROMOTER_ALTER'],
  INSERT_PROMOTER: ['ADMIN_PROMOTER_NEW'],

  ENABLE_DEVICE: ['ADMIN_DEVICE_ENABLE_DISABLE'],
  CONSULT_DEVICES: ['ADMIN_DEVICE_CONSULT'],
  ALTER_DEVICE: ['ADMIN_DEVICE_ALTER'],
  INSERT_DEVICE: ['ADMIN_DEVICE_NEW'],

  ENABLE_POS: ['ADMIN_POS_ENABLE_DISABLE'],
  CONSULT_POS: ['ADMIN_POS_CONSULT'],
  ALTER_POS: ['ADMIN_POS_ALTER'],
  INSERT_POS: ['ADMIN_POS_NEW'],

  DELETE_EXPENSE: ['ADMIN_EXPENSE_DELETE'],
  CONSULT_EXPENSE: ['ADMIN_EXPENSE_CONSULT'],
  ALTER_EXPENSE: ['ADMIN_EXPENSE_ALTER'],
  INSERT_EXPENSE: ['ADMIN_EXPENSE_NEW'],

  ENABLE_PRODUCT_POS: ['ADMIN_POS_ENABLE_DISABLE'],
  CONSULT_PRODUCT_POS: ['ADMIN_POS_CONSULT'],
  ALTER_PRODUCT_POS: ['ADMIN_POS_ALTER'],
  INSERT_PRODUCT_POS: ['ADMIN_POS_NEW'],

  DELETE_CUSTOMER: ['ADMIN_CUSTOMER_DELETE'],
  CONSULT_CUSTOMER: ['ADMIN_CUSTOMER_CONSULT'],
  ALTER_CUSTOMER: ['ADMIN_CUSTOMER_ALTER'],
  INSERT_CUSTOMER: ['ADMIN_CUSTOMER_NEW'],

  CONSULT_DASHBOARD_EVENT_ATTENDANCE: [
    'ADMIN_DASHBOARD_EVENT_ATTENDANCE_CONSULT',
  ],
  CONSULT_DASHBOARD_SECTOR_EVENT: ['ADMIN_DASHBOARD_SECTOR_EVENT_CONSULT'],
  CONSULT_DASHBOARD_SECTOR_BAR: ['ADMIN_DASHBOARD_SECTOR_BAR_CONSULT'],
  CONSULT_DASHBOARD_SECTOR_PARKING: ['ADMIN_DASHBOARD_SECTOR_PARKING_CONSULT'],
  CONSULT_DASHBOARD_SECTOR_VALUES: ['ADMIN_DASHBOARD_SECTOR_VALUES_CONSULT'],

  CONSULT_DASHBOARD_SALES_BY_DAY: ['ADMIN_DASHBOARD_SALES_BY_DAY_CONSULT'],
  CONSULT_DASHBOARD_SALES_BY_LOTE: ['ADMIN_DASHBOARD_SALES_BY_LOTE_CONSULT'],
  CONSULT_DASHBOARD_SALES_BY_SECTOR: [
    'ADMIN_DASHBOARD_SALES_BY_SECTOR_CONSULT',
  ],
  CONSULT_DASHBOARD_VALIDATED_TICKETS: [
    'ADMIN_DASHBOARD_VALIDATED_TICKETS_CONSULT',
  ],
  CONSULT_DASHBOARD_VALIDACAO: ['ADMIN_DASHBOARD_VALIDATED_TICKETS_CONSULT'],
}

export const HasAnyPermissionCSR = (requiredPermissions: string[]): boolean => {
  const router = useRouter()
  const session = useSession()

  if (!session) {
    redirectTo(router, '/login', false)
    return false
  }

  const { privileges } = session
  if (!privileges) return false
  const temPermissao = requiredPermissions.some((required) =>
    privileges.some((permission) => permission === required),
  )
  return temPermissao
}

/**
 *
 * FUNÇÃO PARA USAR NA VALIDAÇÃO SO SERVER SIDE - SSR
 */
export const validateSessionAndPermissionSSR = async (
  context: GetServerSidePropsContext,
  requiredPermissions: string[],
) => {
  const session = await getIronSession<SessionData>(
    context.req,
    context.res,
    sessionOptions,
  )

  const cookies = nookies.get(context) as CookieParse
  const sessionDatabase = await getSession(Number(session.userId))

  if (
    !cookies ||
    !session ||
    !sessionDatabase ||
    typeof cookies.token === 'undefined'
  ) {
    return { redirect: { destination: '/login', permanent: false } }
  }

  if (
    !sessionDatabase.privileges.some((permission:string) =>
      requiredPermissions.includes(permission),
    )
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
export const redirectTo = (
  router: NextRouter,
  url: string,
  allowed: boolean,
) => {
  if (!allowed) {
    return ''
  }
  window.location.href = url
}
