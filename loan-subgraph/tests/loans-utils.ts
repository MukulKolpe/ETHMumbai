import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { LoanPaid } from "../generated/Loans/Loans"

export function createLoanPaidEvent(
  borrower: Address,
  amountPaid: BigInt,
  remainingAmount: BigInt
): LoanPaid {
  let loanPaidEvent = changetype<LoanPaid>(newMockEvent())

  loanPaidEvent.parameters = new Array()

  loanPaidEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanPaidEvent.parameters.push(
    new ethereum.EventParam(
      "amountPaid",
      ethereum.Value.fromUnsignedBigInt(amountPaid)
    )
  )
  loanPaidEvent.parameters.push(
    new ethereum.EventParam(
      "remainingAmount",
      ethereum.Value.fromUnsignedBigInt(remainingAmount)
    )
  )

  return loanPaidEvent
}
