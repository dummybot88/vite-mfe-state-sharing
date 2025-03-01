/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query'
import { graphQlOperation } from '../api/configureGraphql'
import { fetchIssues } from '../components/webApp/graphql/query'
import { useEffect } from 'react'
import { IssueResult } from '../store/webApp/types'
import { setIssues } from '../store/webApp/webAppStore'

const useWebApp = () => {
  // fetch the issues
  const { isSuccess, data } = useQuery({
    queryKey: ['fetchIssues'],
    queryFn: () => graphQlOperation({} as IssueResult, fetchIssues, {})
  })

  const processIssueResult = () => {
    if (isSuccess) {
      const {
        data: {
          fetchIssues: { issues: issueResult }
        }
      } = data
      setIssues(issueResult)
    }
  }

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      processIssueResult()
    }
    // Clean up function to avoid race conditions
    return () => {
      isCancelled = false
    }
  }, [isSuccess, data])
}

export default useWebApp
