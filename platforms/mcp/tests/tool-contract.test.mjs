import assert from "node:assert/strict";
import test from "node:test";

import toolContracts from "../tool-contracts.json" with { type: "json" };
import { createChatUiServer } from "../server.js";
import { createEnhancedChatUiServer } from "../enhanced-server.js";

function getRegisteredTools(createServer) {
  const server = createServer();
  return server._registeredTools ?? {};
}

const serverVariants = [
  { label: "legacy", factory: createChatUiServer },
  { label: "enhanced", factory: createEnhancedChatUiServer },
];

for (const variant of serverVariants) {
  test(`tool contracts cover all registered tools (${variant.label})`, () => {
    const tools = getRegisteredTools(variant.factory);
    const registeredNames = Object.keys(tools).sort();
    const contractNames = Object.keys(toolContracts).sort();

    assert.deepEqual(
      registeredNames,
      contractNames,
      `Tool contracts mismatch (${variant.label}). Registered: ${registeredNames.join(", ")}, Contracts: ${contractNames.join(", ")}`,
    );
  });

  test(`tool contracts validate required metadata (${variant.label})`, () => {
    const tools = getRegisteredTools(variant.factory);

    for (const [name, contract] of Object.entries(toolContracts)) {
      const tool = tools[name];
      assert.ok(tool, `Missing registered tool (${variant.label}): ${name}`);

      const meta = tool._meta ?? {};
      const annotations = tool.annotations ?? {};

      assert.equal(
        annotations.readOnlyHint,
        contract.readOnlyHint,
        `${name} (${variant.label}): readOnlyHint should be ${contract.readOnlyHint}`,
      );
      assert.equal(
        meta["openai/widgetAccessible"],
        contract.widgetAccessible,
        `${name} (${variant.label}): openai/widgetAccessible should be ${contract.widgetAccessible}`,
      );
      assert.equal(
        meta["openai/visibility"],
        contract.visibility,
        `${name} (${variant.label}): openai/visibility should be ${contract.visibility}`,
      );

      assert.ok(
        Array.isArray(meta.securitySchemes) && meta.securitySchemes.length > 0,
        `${name} (${variant.label}): _meta.securitySchemes must be defined`,
      );

      const outputTemplate = meta["openai/outputTemplate"];
      assert.ok(typeof outputTemplate === "string", `${name} (${variant.label}): openai/outputTemplate missing`);
      assert.ok(
        outputTemplate.includes(contract.outputTemplateIncludes),
        `${name} (${variant.label}): openai/outputTemplate should include ${contract.outputTemplateIncludes}`,
      );

      assert.ok(
        Array.isArray(contract.goldenPrompts) && contract.goldenPrompts.length > 0,
        `${name} (${variant.label}): goldenPrompts must be defined`,
      );
    }
  });
}
