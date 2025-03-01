export interface Issue {
  isbn: string
  abstract: string
}

export interface IssueResponse {
  issues: Issue[]
}

export interface IssueResult {
  fetchIssues: IssueResponse
}

export interface WebAppState {
  issues: Issue[]
}

export const initialState: WebAppState = {
  issues: []
}
