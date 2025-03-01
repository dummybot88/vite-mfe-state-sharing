import { gql } from 'graphql-request'

export const fetchIssues = gql`
  query fetchIssues {
    fetchIssues {
      issues {
        isbn
        abstract
      }
    }
  }
`
