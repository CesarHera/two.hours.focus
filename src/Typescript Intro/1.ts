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