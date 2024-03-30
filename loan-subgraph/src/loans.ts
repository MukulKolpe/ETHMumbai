import { LoanPaid as LoanPaidEvent } from "../generated/Loans/Loans"
import { LoanPaid } from "../generated/schema"

export function handleLoanPaid(event: LoanPaidEvent): void {
  let entity = new LoanPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.borrower = event.params.borrower
  entity.amountPaid = event.params.amountPaid
  entity.remainingAmount = event.params.remainingAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
