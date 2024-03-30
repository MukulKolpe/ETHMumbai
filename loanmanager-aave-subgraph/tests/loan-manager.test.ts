import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ActiveLoansSet } from "../generated/schema"
import { ActiveLoansSet as ActiveLoansSetEvent } from "../generated/LoanManager/LoanManager"
import { handleActiveLoansSet } from "../src/loan-manager"
import { createActiveLoansSetEvent } from "./loan-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let borrower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let status = "boolean Not implemented"
    let newActiveLoansSetEvent = createActiveLoansSetEvent(borrower, status)
    handleActiveLoansSet(newActiveLoansSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ActiveLoansSet created and stored", () => {
    assert.entityCount("ActiveLoansSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ActiveLoansSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ActiveLoansSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "status",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
