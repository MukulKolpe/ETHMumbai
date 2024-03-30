import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LoanPaid } from "../generated/schema"
import { LoanPaid as LoanPaidEvent } from "../generated/Loans/Loans"
import { handleLoanPaid } from "../src/loans"
import { createLoanPaidEvent } from "./loans-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let borrower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountPaid = BigInt.fromI32(234)
    let remainingAmount = BigInt.fromI32(234)
    let newLoanPaidEvent = createLoanPaidEvent(
      borrower,
      amountPaid,
      remainingAmount
    )
    handleLoanPaid(newLoanPaidEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LoanPaid created and stored", () => {
    assert.entityCount("LoanPaid", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LoanPaid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LoanPaid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountPaid",
      "234"
    )
    assert.fieldEquals(
      "LoanPaid",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "remainingAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
