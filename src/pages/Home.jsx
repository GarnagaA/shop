import Search from '../components/Search'
import Card from '../components/Card'
import { useContext } from 'react'
import AppContext from '../components/context'

// const sneakers = [
// 	{
// 		pureId: '835386',
// 		src: 'img/sneakers/1.jpg',
// 		title: 'Кроссовки Invisible White Black | BLAZE-BY',
// 		price: '197700'
// 	},
// 	{
// 		pureId: '38166',
// 		src: 'img/sneakers/2.jpg',
// 		title: 'Кроссовки Nike Dunk Low Retro White Black | BLAZE-BY',
// 		price: '9990'
// 	},
// 	{
// 		pureId: '37463',
// 		src: 'img/sneakers/3.jpg',
// 		title: 'Nike M2K Tekno',
// 		price: '32200'
// 	},
// 	{
// 		pureId: '23931',
// 		src: 'img/sneakers/4.jpg',
// 		title: 'Nike Air Force 1 07 QS Valentines Day Love Letter',
// 		price: '20100'
// 	},
// 	{
// 		pureId: '394023',
// 		src: 'img/sneakers/5.jpg',
// 		title: 'Кроссовки Nike Air 200',
// 		price: '10700'
// 	},
// 	{
// 		pureId: '29582',
// 		src: 'img/sneakers/6.jpg',
// 		title: 'Кроссовки Nike Elephant One',
// 		price: '21990'
// 	},
// 	{
// 		pureId: '48232',
// 		src: 'img/sneakers/7.jpg',
// 		title: 'Кроссовки Nike Model 69',
// 		price: '10700'
// 	},
// 	{
// 		pureId: '193753',
// 		src: 'img/sneakers/8.jpg',
// 		title: 'Yeezy Boost 350 V2 Black (Non-Reflective)',
// 		price: '10230'
// 	},
// 	{
// 		pureId: '5873732',
// 		src: 'img/sneakers/9.jpg',
// 		title: 'Air Jordan 1 Retro High Hyper Royal',
// 		price: '10400'
// 	},
// 	{
// 		pureId: '5873732',
// 		src: 'img/sneakers/10.jpg',
// 		title: 'Air Jordan 1 Retro High Hyper Royal',
// 		price: '10400'
// 	},
// 	{
// 		pureId: '5873732',
// 		src: 'img/sneakers11.jpg',
// 		title: 'Air Jordan 1 Retro High Hyper Royal',
// 		price: '10400'
// 	},
// 	{
// 		pureId: '5873732',
// 		src: 'img/sneakers/12.jpg',
// 		title: 'Air Jordan 1 Retro High Hyper Royal',
// 		price: '10400'
// 	}
// ]

// const kitchens = [
//     {
//       "pureId": "835386",
//      "title": "Кухня ДЖОЙ",
//       "price": "197700",
//       "imageUrl": [
//         "https://via.placeholder.com/150/f9f067",
//         "https://www.1mf.ru/upload/iblock/cce/cce8fd8d73ce81207e86fe81188040c9.jpg",
//         "https://www.1mf.ru/upload/iblock/643/6435d58395436575434b3f612f087803.jpg",
//         "https://www.1mf.ru/upload/iblock/d92/d9230d417be02630c5db8f502ba40324.jpg"
//       ]
//     },
//     {
//       "pureId": "85494",
//       "title": "Кухня СИНГЛ",
//       "price": "69780",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/d11/d11a30a40fa6eb41a12daf23a0735b49.jpg",
//         "https://www.1mf.ru/upload/iblock/292/bf45de1e1412a0ff1d30e027a388d351.jpg",
//         "https://www.1mf.ru/upload/iblock/146/146047690a09cff3e4bd61bd077f0f07.jpg",
//         "https://www.1mf.ru/upload/iblock/7b3/806%D1%85550-%D1%81%D0%B8%D0%BD%D0%B3%D0%BB.jpg"
//       ]
//     },
//     {
//       "pureId": "206290",
//       "title": "Кухня ЛАЙН",
//       "price": "192100",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/9cf/806%D1%85550-%D0%BB%D0%B0%D0%B9%D0%BD.jpg",
//         "https://www.1mf.ru/upload/iblock/9cf/806%D1%85550-%D0%BB%D0%B0%D0%B9%D0%BD.jpg",
//         "https://www.1mf.ru/upload/iblock/aef/aef070fcf8def13a837e1b2c7f3cf40c.jpg",
//         "https://www.1mf.ru/upload/iblock/750/750cd409efc2c34594cc2b660b2c4199.jpg"
//       ]
//     },
//     {
//       "pureId": "19048",
//       "title": "Кухня ЛОТАРИНГИЯ",
//       "price": "142200",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/4e5/lotaringija_806%D1%85550.jpg",
//         "https://www.1mf.ru/upload/iblock/8a9/8a94a847ef902dca3d828b42a4c3bd88.jpg",
//         "https://www.1mf.ru/upload/iblock/464/4643a4493ff13e207c2c20d6bcb25b12.jpg",
//        "https://www.1mf.ru/upload/iblock/017/4e6cbd0573b6525d16c8255ccbb13b8c.jpg"
//       ]
//     },
//     {
//       "pureId": "663498",
//       "title": "Кухня ЧЕСТЕР",
//       "price": "149500",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/2fb/40e2856f3a8bf98c9fce914b1fc65df8.jpg",
//         "https://www.1mf.ru/upload/iblock/735/735369a91b1a51c60d1c665b1a896a53.jpg",
//         "https://www.1mf.ru/upload/iblock/8f8/8f8598fdfc3f624870ffe5c149a54cc7.jpg",
//         "https://www.1mf.ru/upload/iblock/673/67346ea0f6a33aa2555f995ef35d3e73.jpg"
//       ]
//     },
//     {
//       "pureId": "317626",
//       "title": "Кухня МЮНХЕН",
//       "price": "142200",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/b4d/b4d60988947dd5258766edbf528bd200.jpg",
//         "https://www.1mf.ru/upload/iblock/8a2/8a2bd2e84fde7ca257b01a7b710019e2.jpg",
//         "https://www.1mf.ru/upload/iblock/4d8/4d88b2ed7f0591bfaddd35857521e9d8.jpg",
//         "https://www.1mf.ru/upload/iblock/0b4/0b4a740d50b319d3fc9d5af60a7d1be6.jpg"
//       ]
//     },
//     {
//       "pureId": "220431",
//       "title": "Кухня ОРЛЕАН",
//       "price": "225200",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/4d9/4d955b1c5a00c3a0450ef1689013b676.jpg",
//         "https://www.1mf.ru/upload/iblock/5a8/5a871d61018bedf6cec5df1210a16d45.jpg",
//         "https://www.1mf.ru/upload/iblock/b09/b098d07b090de9a168c3b611eb3da8e0.jpg",
//         "https://www.1mf.ru/upload/iblock/d0b/d0bf08db88c99451fc428421432907e9.jpg"
//       ]
//     },
//     {
//       "pureId": "285886",
//       "title": "Кухня ПРОВАНС",
//       "price": "206900",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/medialibrary/2b6/pryamaya_kuhnya_provans_v_stile_neoklassika_v_cvete_emal_vino.jpg",
//         "https://www.1mf.ru/upload/iblock/5b3/806%D1%85550-%D0%BF%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D1%81.jpg",
//         "https://www.1mf.ru/upload/iblock/14a/14a34b9ed41869bd89a25677a3b385d9.jpg",
//         "https://www.1mf.ru/upload/iblock/b92/b92eedbcb87a67f98bb92a9178823b9b.jpg"
//         ]
//     },
//     {
//       "pureId": "309769",
//       "title": "Кухня АР-ДЕКО",
//       "price": "126150",
//       "imageUrl": [
//         "https://www.1mf.ru/upload/iblock/2bc/2bc072ce33b0241eb17d0406c63bbfcc.jpg",
//         "https://www.1mf.ru/upload/iblock/d36/806%D1%85550-%D0%B0%D1%80-%D0%B4%D0%B5%D0%BA%D0%BE.jpg",
//         "https://www.1mf.ru/upload/iblock/e62/e62390ed30f4cc327bf9ef6a2907d091.jpg",
//         "https://www.1mf.ru/upload/iblock/5de/5de52294d64cc3dbd6b7082e87eb269d.jpg"
//         ]
//     },
//     {
//     "pureId": "621551",
//     "title": "Кухня ЭТНО",
//     "price": "113100",
//     "imageUrl": [
//       "https://www.1mf.ru/upload/iblock/e4b/e4b653e9629b1e85d3826e50280ed72c.jpg",
//       "https://www.1mf.ru/upload/iblock/c65/c657629e171e6f312856525d374fbccc.jpg",
//       "https://www.1mf.ru/upload/iblock/dc9/dc93c08c4cd4f1dd63edaaccf0f60180.jpg",
//       "https://www.1mf.ru/upload/iblock/247/2477bc894c2dce58c9200be517d66e26.jpg"
//     ]
//     }
// ]

function Home() {
  const {items, isLoading, searchValue} = useContext(AppContext)
  const renderItems = () => {
    const filteredItems = items.filter(obj =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card key={index} {...item} />
    ))
  }

  return (
    <div className='content2 p-40'>
      <Search />
      <ul className='d-flex flex-wrap'>{renderItems()}</ul>
    </div>
  )
}
export default Home
