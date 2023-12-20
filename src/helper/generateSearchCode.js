export default function generateSearchCode(searchParams) {
    const andArray = [];

    // Check if the properties exist and are of type string
    if ( searchParams.anaKategori instanceof Array ) {
      const anaKategoriValues = searchParams.anaKategori
      const orAnaKategori = anaKategoriValues.map((value) => ({ anaKategori: decodeURI(value )}));
      if (orAnaKategori.length > 0) {
    
        andArray.push({ $or: orAnaKategori });
      }
    }
  
    if ( searchParams.marka instanceof Array) {
      const markaValues = searchParams.marka
      const orMarka = markaValues.map((value) => ({ marka: value }));
      if (orMarka.length > 0) {
        andArray.push({ $or: orMarka });
      }
    }
  
    if ( searchParams.renk instanceof Array) {
      const renkValues = searchParams.renk
      const orRenk = renkValues.map((value) => ({ renk: value }));
      if (orRenk.length > 0) {
        andArray.push({ $or: orRenk });
      }
    }
    if ( searchParams.kategori instanceof Array) {
        const kategoriValues = searchParams.kategori
        const orKategori = kategoriValues.map((value) => ({ kategori: value }));
        if (orKategori.length > 0) {
          andArray.push({ $or: orKategori });
        }
      }

      if ( searchParams.q instanceof Array) {
        const qValues = searchParams.q.split('&');
        const orQ = qValues.map((value) => ({ q: value }));
        if (orQ.length > 0) {
          andArray.push({ $and: orQ });
        }
      }
    const finalCode = { $and: andArray };
  
    return finalCode;
  }
  

  