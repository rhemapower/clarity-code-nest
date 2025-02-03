import {
  Clarinet,
  Tx,
  Chain,
  Account,
  types
} from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Ensure can create new session",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    
    let block = chain.mineBlock([
      Tx.contractCall("code-nest", "create-session", [
        types.utf8("Test Session"),
        types.utf8("Test Description")
      ], wallet_1.address)
    ]);
    
    assertEquals(block.receipts.length, 1);
    assertEquals(block.height, 2);
    
    block.receipts[0].result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Ensure can join existing session",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet_1 = accounts.get("wallet_1")!;
    const wallet_2 = accounts.get("wallet_2")!;
    
    let block = chain.mineBlock([
      Tx.contractCall("code-nest", "create-session", [
        types.utf8("Test Session"),
        types.utf8("Test Description")
      ], wallet_1.address),
      Tx.contractCall("code-nest", "join-session", [
        types.uint(1)
      ], wallet_2.address)
    ]);
    
    assertEquals(block.receipts.length, 2);
    block.receipts[1].result.expectOk().expectBool(true);
  },
});

Clarinet.test({
  name: "Ensure can submit review",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Test implementation
  },
});

Clarinet.test({
  name: "Ensure can award points",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Test implementation
  },
});
