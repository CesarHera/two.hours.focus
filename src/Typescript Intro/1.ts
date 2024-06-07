// function nuncaDevuelveNada(message: string): never {
//   // throw new Error(message)
//   // console.log("asdfasd")
//   // reutrn
// }



type Uuid = `${string}-${string}-${string}-${string}-${string}` //from crypto.randomUuid()

type BasicHero = {
  readonly id: Uuid,
  name: string,
}
type HeroMoreInfo = {
  age: number,
  isActive?: boolean
}


//types POO programación orientada a objetos, extendemos typos para crear mas complejos a partir de pequeños types
type Hero = BasicHero & HeroMoreInfo



let hero: Hero = {
  id: crypto.randomUUID() ,
  name: 'Thor',
  age: 1234
}


function crearHeroe(basicHero: BasicHero): Hero {
  const {id, name} = basicHero
  
  return { 
    id,
    name, 
    age: 123,
    isActive: true
  }
}




const hulk = crearHeroe({id: crypto.randomUUID(), name: "Hulk"})


type HexadecimalColor = `#${string}`
type GalacticScope = 'global' | 'galactic' | 'terrain'

const avengersScope: GalacticScope = 'terrain' //super interesante probar el ctrl + space

const myColor: HexadecimalColor = '#112233'


//por ejemplo en componentes por defecto de react es muy comun para indicar con un booleano que se active una funcion, pero que reciba otro tipo para mas detalle
// const animation: boolean | number = true
const animation: boolean | number = 500 //500ms or true for a default value: 200ms




//type indexing
//si tienes un obeto muy grande, esta perro que puedes crear atributos que sean tipos en si mismos, y acceder a ese atributo especificamente
type Ciudad = {
  nombre: string,
  estado: {
    nombre: string,
    pais: string,
  }
}


const estadoNatal: Ciudad['estado'] = {
  nombre: 'Jalisco',
  pais: 'Mexico'
}
//para no tener que crear pinches types a lo pendejo, mejor haces el global y de ahi indexas tipos





//esto creo que lo  voy a usar muy seguido y es que cuando haces una funcion que construye 
//cualquier tipo de plantilla por ejemplo o de objetos comunes, puedes obtener el tipo exacto 
//que retorna esa funcion, por ejemplo:
const createBaseAgent = (name: string, age: number, cua: number) => {
  return {
    id: crypto.randomUUID(),
    name,
    age,
    cua
  }
}

type BaseAgent = ReturnType<typeof createBaseAgent>

const cesarAgent: BaseAgent = createBaseAgent('Cesar Hera', 20, 409021)

//supeer util la verdad





// ahora paralos arrays
const langs: (string | number)[] = []

langs.push('javascript')
langs.push(123)

const agentsDataBase: BaseAgent[] = []

agentsDataBase.push(cesarAgent)




// recuerdads lo que hicimos con un string donde pasamos el template string con donde iba cada variable?
// pues podemos hacer algo muy parecido con losarrays para que tegan posiciones y tamaños especificos
type RGB = [number, number, number]
const enfasisColor: RGB = [244, 0, 200]

type Table = [
  [string, string],
  [string, string]
]

const agentTables: Table = [
  ['CUA', 'Nombre'],
  ['123', 'Cesar']
]


