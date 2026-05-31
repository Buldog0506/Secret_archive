import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const archiveUrl = "https://disk.yandex.ru/d/G48HexS4VmqZGQ";
const binaryClue = `01010101 01111001 01101101 01101000 00100000
01010001 01100101 01110110 01100111 01111001 01110111 00100000
01000101 01111001 01110110 01101001 01110000 01101101 01111001 01110111 00100000
01100111 01110011 01101011 01101101 01111000 01100101 01100110 01100101 01111000 00100000
01100111 01111001 01110001 00100000
01110000 01101101 01100110 01110110 01111001 01110001 00100000
01110111 01111001 01111001 01110001 00100000
01110111 01100111 01101101 01100110 01101001 01110110 01101001 01111000 00111111`;

test("console page contains the requested source clue and secret outputs", async () => {
  const index = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(index, /Boek 12, re[eë]l 17/);
  assert.match(index, /Si tibi non placet, noli facere; si non verum est, noli de eo loqui\. Sint cupiditates tuae firmae in omnibus\./);
  assert.match(index, /duck\.html/);
  assert.ok(index.includes(binaryClue));
});

test("duck page links the duck image to the provided archive", async () => {
  const duck = await readFile(new URL("../duck.html", import.meta.url), "utf8");

  assert.match(duck, /assets\/duck\.png/);
  assert.ok(duck.includes(archiveUrl));
  assert.match(duck, /download-link/);
});

test("project contains only harmless phishing-themed props", async () => {
  const props = await readFile(new URL("../secret_files/fake_phishing_props.txt", import.meta.url), "utf8");

  assert.match(props, /муляж/i);
  assert.doesNotMatch(props, /<form/i);
  assert.doesNotMatch(props, /password/i);
  assert.doesNotMatch(props, /fetch\(/i);
});
