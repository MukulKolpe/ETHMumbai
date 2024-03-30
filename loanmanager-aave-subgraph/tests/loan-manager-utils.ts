import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ActiveLoansSet,
  LoanCreated
} from "../generated/LoanManager/LoanManager"

export function createActiveLoansSetEvent(
  borrower: Address,
  status: boolean
): ActiveLoansSet {
  let activeLoansSetEvent = changetype<ActiveLoansSet>(newMockEvent())

  activeLoansSetEvent.parameters = new Array()

  activeLoansSetEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  activeLoansSetEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )

  return activeLoansSetEvent
}

export function createLoanCreatedEvent(
  borrower: Address,
  loanContract: Address
): LoanCreated {
  let loanCreatedEvent = changetype<LoanCreated>(newMockEvent())

  loanCreatedEvent.parameters = new Array()

  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "loanContract",
      ethereum.Value.fromAddress(loanContract)
    )
  )

  return loanCreatedEvent
}
