# Tentang

Pengubah `env` ke obyek JavaScript.

## Instalasi

```
pnpm add envobject
```

## Penggunaan

Pakai string berformat env langsung:

```
import { EnvDariString } from './induk.js'

const stringEnv = `
  PORT=8765
  KEY=878yfjhdjhfd8
  SIAP=yes
`

const hasil = (new EnvDariString(stringEnv)).keObyek()

console.log(hasil)
```

Pakai file env (metode `keObyek` bersifat **asingkron**):

```
import { EnvDariFile } from './induk.js'

const hasil = await (new EnvDariFile('./lokasi/file/.env')).keObyek()

console.log(hasil)
```

## Lisensi

MIT