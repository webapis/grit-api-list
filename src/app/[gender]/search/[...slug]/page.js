import orderData from "@/helper/orderData";
import ProductPage from "@/components/ProductPage";
import algoliasearch from "algoliasearch/lite";
import capitalizeAllWords from "@/helper/capitalizeAllWords";
const client = algoliasearch("7JF244QSZZ", "af8e387eae1a3614f7b0ba204c59f4a5");
const domainname=process.env.domainname

export async function generateMetadata({ params:{gender,slug} }) {

  let originalString = `${decodeURI( gender.replace('-',' '))} ${slug[1]} | ${domainname}`
 let capitalizedString = capitalizeAllWords(originalString);


 
   return {
     title: capitalizedString,
     description:capitalizedString,
    
   }
 }

export default async function SearchPage(props) {
  const {
    params: { slug,gender },
  } = props;

  try {
    const index = client.initIndex( decodeURI( gender));

    const result = await index.search(` ${decodeURI( slug[1])}`, {
      attributesToRetrieve: [
        "title",
        "marka",
        "gender",
        "price",
        "link",
        "imageUrl",
      ],
      hitsPerPage: 100,
      page:slug[slug.length-1],
     // length:50
     // advancedSyntax: true
    });

    const data = {
      data: orderData(
        result.hits.map((m) => {
          return { item: { ...m } };
        })
      ),
      total: result.nbHits,
    };

    return <ProductPage {...data} {...props} />;
  } catch (error) {
    return <dib>Backend server error</dib>;
  }
}
