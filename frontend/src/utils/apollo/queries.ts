import { gql } from "@apollo/client";

export const ALLLOANS = gql`
  query {
    loanCreateds(orderDirection: asc) {
      loanContract
      borrower
    }
  }
`;
