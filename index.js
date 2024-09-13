import { readFile, writeFile } from 'node:fs/promises'

/**
 * A class to convert `env` into JS `object`.
 */
class Env {
  /**
   * Constructor
   * @param {string|object} input Accept env-like `string` (e.g. `'FOO=BAR'`) or
   * `object` with `path` property containing `string` that denote
   * the location of `.env` file, e.g. `{ path: './.env' }`
   */
  constructor(input) {
    this.input = input
    // can't read file async here, so delayed
    this.raw = typeof input == 'string' ? input : null
  }

  /**
   * Private method to handle user input which will just return string
   * if the argument is just plain string, or read the file first if it's an object
   * with `path` property.
   * @returns {string} string in env format
   */
  async #env() {
    if (this.raw == null) {

      const env = await readFile(this.input.path)

      return env.toString()

    } else {

      return this.raw

    }
  }

  /**
   * A method that will produce object output. Mapping env property-value
   * to plain JS object.
   * @returns {object} an object as a result of env mapping
   */
  async toObject() {
    const step1 = (await this.#env()).split('\n')
    const step2 = step1.map((item) => {
      return item.split('=')
    })

    return Object.fromEntries(step2)
  }
}

/**
 * A class that converts your plain JS object to env-like format.
 * If it's a json, parse it to object first. This only accept object of one depth.
 * Nested object won't be flatten first.
 */
class ObjectToEnv {
  /**
   * Constructor
   * @param {object} obj an object to be processed
   */
  constructor(obj) {
    this.obj = obj
  }

  /**
   * Convert an object of one-level depth to env-like string.
   * This will automatically write to file.
   * @param {string} path path to write
   * @returns string of env-like format
   */
  async toEnv(path) {
    let env = []

    for (const [key, val] of Object.entries(this.obj)) {
      env.push(`${key}=${val}`)
    }

    await writeFile(path, env.join('\n'))
  }
}

export { Env, ObjectToEnv }