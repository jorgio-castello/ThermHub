import * as base64 from 'byte-base64';

// Helper function to see what the binary looks like in ASCII
function printBinary(bytes: ArrayBuffer): string {
  const view = new DataView(bytes);
  let line = '';
  let asChars = '';
  for (let i = 0; i < 10000; i++) {
    if (i % 20 === 0) {
      console.log(`${line}  ${asChars}`);
      line = '';
      asChars = '';
    }
    const byte = view.getUint8(i);
    line += `${byte}`.padStart(4);
    if (byte > 32 && byte < 127) {
      asChars += String.fromCharCode(byte);
    } else {
      asChars += '.';
    }
  }
  return '';
}

// Assumes delimiter is present at the start of the file and consists of ASCII characters between 32 and 127
const getDelimiter = (bytes: Uint8Array): number[] => {
  const delimiterBytes = [];
  let byteIdx = 0;
  let byte = bytes[byteIdx];
  while (byte > 32 && byte < 127) {
    delimiterBytes.push(byte);
    byte = bytes[++byteIdx];
  }
  return delimiterBytes;
}

// This function is called to confirm if a potential delimiter sequence has been found in a buffer
// If not, return 0 - which will prevent the current byte sequence from being pushed into photoArr before completion
// If so, determine if the delimiter found is the final delimiter, if so return Infinity, which will break the assembleContent parsing
// If the delimiter found is not the final one, return the idx where the next photoContent begins
const findImageBytesStart = (bytes: Uint8Array, byteIdx: number, delimiterBytes: number[]): number => {
  // Confirm delimiter sequence
  for (let j = 0; j < delimiterBytes.length; j += 1) {
    if (delimiterBytes[j] !== bytes[byteIdx]) return 0;
    byteIdx += 1;
  }
  // Check if final delimiter
  if (bytes[byteIdx + 1] === 45 && bytes[byteIdx + 2] === 45) {
    return Infinity;
  }
  // Find where the next photo's bytes begin
  let foundNextStart = false;
  while (!foundNextStart) {
    if (bytes[byteIdx] === 13 && bytes[byteIdx + 1] === 10 && bytes[byteIdx + 2] === 13 && bytes[byteIdx + 3] === 10) {
      foundNextStart = true;
    } else {
      byteIdx += 1;
    }
  }
  return byteIdx + 4;
}

// This function generates an array of Uint8Array - each sub-array is consists of JPEG  bits
// 1. Loop through the bytes
// 2. When a potential delimiter sequence is found, check to see if it's valid
// 3. If so, create a slice for the current sequence, and push it into the result
// 4. Check if startIdx === Infinity, which means we are past the final delimiter and should push remaining bytes into result
// 5. If we're not yet at the end, update contentStart and contentEnd to reflect the new startIdx
const assembleContent = (bytes: Uint8Array, imageStartIdx: number, delimiterBytes: number[]): Uint8Array[] => {
  const result: Uint8Array[] = [];
  for (let imageEndIdx = imageStartIdx; imageEndIdx < bytes.length; imageEndIdx += 1) {
    if (bytes[imageEndIdx] === delimiterBytes[0] && bytes[imageEndIdx + 1] === delimiterBytes[1]) {
      const nextStartIdx = findImageBytesStart(bytes, imageEndIdx, delimiterBytes);
      if (nextStartIdx > 0) {
        const sequence = bytes.slice(imageStartIdx, imageEndIdx);
        result.push(sequence);

        if (nextStartIdx === Infinity) break;
        imageStartIdx = nextStartIdx;
        imageEndIdx = nextStartIdx - 1;
      }
    }
  }
  result.push(bytes.slice(imageStartIdx));
  return result;
}

export function convertBinaryToBase64(buffer: ArrayBuffer): string[] {
  const bytes = new Uint8Array(buffer);
  const delimiterBytes = getDelimiter(bytes);
  const imageBytesStartIdx = findImageBytesStart(bytes, 0, delimiterBytes);

  if (!imageBytesStartIdx) {
    throw new Error('Unsupported Content Type');
  }
  const binarySequences: Uint8Array[] = assembleContent(bytes, imageBytesStartIdx, delimiterBytes);
  return binarySequences.map(sequence => 'data:image/jpeg;base64,' + base64.bytesToBase64(sequence));
}
