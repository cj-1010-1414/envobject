import { EnvDariString, EnvDariFile } from '../induk.js'

const stringEnv = `
  PORT=8765
  KEY=878yfjhdjhfd8
  SIAP=yes
`

const stringNonEnv = `
  hsd878hg
  mbuh
  JI=998
`

const hasil = await (new EnvDariFile('./tes/bahan/non-env.env')).keObyek() // (new EnvDariString(stringEnv)).keObyek()

console.log(hasil)