import { readFile } from 'node:fs/promises'

function mengandungSamaDengan(line) {
  return line.includes('=')
}

function throwNonString(input) {
  const tipeInput = typeof input

  if (tipeInput != 'string') {
    throw new TypeError(`Inputmu bukan string, tapi ${tipeInput}`)
  }
  
  return
}

function jadikanObyek(input) {
  // hapus spasi dan tab di awal, di akhir, dan dimanapun kecuali karakter baris baru
  // pemisahan berdasarkan baris
  const bahan = input
    .trim()
    .replace(/ +?/g, '')
    .split('\n') // step 1
  
  if (!bahan.every(mengandungSamaDengan)) {
    throw new TypeError('String tidak berformat env. Coba lihat lagi.')
  }

  // pemisahan berdasarkan karakter =
  const bahan2 = bahan.map((item) => {
    return item.split('=')
  })

  return Object.fromEntries(bahan2)
}

class EnvDariString {
  constructor(input) {
    throwNonString(input)
    
    this.input = input
  }
  
  keObyek() {
    return jadikanObyek(this.input)
  }
}

class EnvDariFile {
  constructor(input) {
    throwNonString(input)
    
    this.input = input
  }
  
  async keObyek() {
    const isiFile = (await readFile(this.input)).toString()
    
    return jadikanObyek(isiFile)
  }
}

export { EnvDariString, EnvDariFile }