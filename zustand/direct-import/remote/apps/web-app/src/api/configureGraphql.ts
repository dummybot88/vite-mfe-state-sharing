import { RequestMiddleware, GraphQLClient, Variables } from 'graphql-request'
import { config } from '@repo/app-config'

/**
 * Middleware function to be used with GraphQL requests.
 * Adds the Authorization header to the request headers.
 *
 * @param request - The GraphQL request.
 * @returns The modified GraphQL request.
 */
const requestMiddleware: RequestMiddleware = async request => {
  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${localStorage.getItem('ppeJwt')}`
    }
  }
}

/**
 * GraphQL client for making GraphQL operations.
 */
const _client = new GraphQLClient(config.bff.api.path, { requestMiddleware, errorPolicy: 'all' })

/**
 * Executes a GraphQL operation.
 *
 * @param data - The data to be sent in the operation.
 * @param operation - The GraphQL operation.
 * @param variables - The variables for the operation.
 * @returns A Promise that resolves to the result of the operation.
 */
export function graphQlOperation<T>(data: T, operation: string, variables?: Variables) {
  return _client.rawRequest<typeof data>(operation, variables)
}
