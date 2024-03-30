import {
  ActiveLoansSet as ActiveLoansSetEvent,
  LoanCreated as LoanCreatedEvent
} from "../generated/LoanManager/LoanManager"
import { ActiveLoansSet, LoanCreated } from "../generated/schema"

export function handleActiveLoansSet(event: ActiveLoansSetEvent): void {
  let entity = new ActiveLoansSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanCreated(event: LoanCreatedEvent): void {
  let entity = new LoanCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.loanContract = event.params.loanContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
