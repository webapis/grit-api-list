export default function FoundItems({total}){
    const options = {
        style: "decimal",
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
    
      const formattedNumber = new Intl.NumberFormat("tr-TR", options).format(total);

      return       <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '1rem' ,opacity:0.8, marginLeft: '1rem'}}>{formattedNumber} adet ürün.</div>
}