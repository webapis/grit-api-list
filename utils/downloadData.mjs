
import * as dotenv from 'dotenv' 

 import{ downloadCollection } from'./uploadCollection.mjs'
   // const genders = [{ gender: 'erkek', gender1: 'erkek' }]
   const genders = [
  { gender: 'kadin', gender1: 'temp-kadin' },
    { gender: 'erkek', gender1: 'temp-erkek' },
     { gender: 'kcocuk', gender1: 'temp-kız-çocuk' }, 
      { gender: 'ecocuk', gender1: 'temp-erkek-çocuk'  }
  ]

    for (let g of genders) {
        const { gender, gender1 } = g
        await downloadCollection(gender,gender1)
    }
 

