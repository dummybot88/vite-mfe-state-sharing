import fs from 'fs'
import { faker } from '@faker-js/faker'

// Seed to create the same output every time
faker.seed(1)

const ISSUE_COUNT = 10

interface Issue {
  isbn: string
  abstract: string
}

interface MockIssueData {
  issues: Issue[]
}

interface IssueQueryResponse {
  fetchIssues: MockIssueData
}

interface MockGraphqlResponse {
  data: IssueQueryResponse
}

const mockIssue: MockIssueData = {
  issues: []
}

const issueQueryResponse: IssueQueryResponse = {
  fetchIssues: mockIssue
}

const issueResponse: MockGraphqlResponse = {
  data: issueQueryResponse
}

for (let i = 0; i < ISSUE_COUNT; i++) {
  const issue: Issue = {
    isbn: faker.commerce.isbn(),
    abstract: faker.lorem.paragraph(2)
  }
  mockIssue.issues.push(issue)
}

// Write to file
fs.writeFile('mock.json', JSON.stringify(issueResponse, null, 2), 'utf8', err => {
  if (!err) {
    console.log('Written generated mock to mock.json!')
  } else {
    console.error(err)
  }
})
